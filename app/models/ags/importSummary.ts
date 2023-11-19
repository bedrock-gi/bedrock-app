import { Ags } from "./models";
import type { TableMapping } from "./mappings";
import { mappings, mappingsHierarchy } from "./mappings";

import { parseAgsGroup } from "./parse";
import type {
  AgsMapping,
  ObjectWithStringKeys,
} from "../../types/agsMappingConfig";
import { readFileSync, writeFileSync } from "fs";
import type { AgsUpload } from "@prisma/client";

type AgsUploadSummary = {
  numNewRecords: number;
  numUpdatedRecords: number;
  mapping: AgsMapping<any, any, any>;
};

type AgsUploadSummaryBlob = {
  newRecords: ObjectWithStringKeys[];
  updatedRecords: ObjectWithStringKeys[];
  mappingKey: string;
};

function saveRecordsToBlob(uploadId: string, records: AgsUploadSummaryBlob[]) {
  const asJson = JSON.stringify(records);

  writeFileSync(`./uploads/${uploadId}.json`, asJson);
}

export async function createAgsImportSummary(
  inputFile: string,
  projectId: string,
  uploadId: string
) {
  const ags = new Ags(inputFile);

  const groups: AgsUploadSummaryBlob[] = [];

  const stack = [mappingsHierarchy];

  while (stack.length > 0) {
    const currentMapping = stack.pop();
    if (!currentMapping) {
      throw new Error("No current mapping");
    }
    const agsGroup = ags.agsData[currentMapping.mapping.agsTableName];

    const records = parseAgsGroup(agsGroup, currentMapping.mapping);

    const { newRecords, updatedRecords } =
      await currentMapping.mapping.findExistingRecords(
        records.parsedRecords,
        projectId
      );

    const summary = {
      newRecords,
      updatedRecords,
      mappingKey: currentMapping.mapping.prismaLabel,
      mapping: currentMapping.mapping,
    };

    groups.push(summary);

    if (currentMapping.children) {
      stack.push(...currentMapping.children);
    }
  }

  saveRecordsToBlob(
    uploadId,
    groups.map((group) => ({
      newRecords: group.newRecords,
      updatedRecords: group.updatedRecords,
      mappingKey: group.mappingKey,
    }))
  );

  const agsUploadSummary: AgsUploadSummary[] = groups.map((group) => {
    return {
      mapping: mappings[group.mappingKey as keyof typeof mappings],
      numNewRecords: group.newRecords.length,
      numUpdatedRecords: group.updatedRecords.length,
    };
  });

  return agsUploadSummary;
}

export async function uploadToPrismaFromBlob(upload: AgsUpload) {
  const blob = readFileSync(`./uploads/${upload.id}.json`, "utf-8");
  const agsUpload: AgsUploadSummaryBlob[] = JSON.parse(blob);

  async function uploadToPrisma(tableMapping: TableMapping) {
    const agsUploadGroup = agsUpload.find(
      (group) => group.mappingKey === tableMapping.mapping.prismaLabel
    );

    if (agsUploadGroup) {
      await tableMapping.mapping.createRecords(
        agsUploadGroup.newRecords,
        upload.projectId
      );
      console.log("Created records for", tableMapping.mapping.prismaLabel);

      await tableMapping.mapping.updateRecords(
        agsUploadGroup.updatedRecords,
        upload.projectId
      );
      console.log("Updated records for", tableMapping.mapping.prismaLabel);
    }

    if (tableMapping.children) {
      tableMapping.children.forEach(async (child) => {
        await uploadToPrisma(child);
      });
    }
  }

  await uploadToPrisma(mappingsHierarchy);
}
