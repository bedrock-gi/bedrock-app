import { Ags } from "./models";
import { mappings } from "./mappings";

import type AgsMapping from "../../types/agsMapping";

import { parseAgsGroup } from "./parse";
import type { ObjectWithStringKeys } from "../../types/agsMapping";
import { readFileSync, writeFileSync } from "fs";
import type { AgsUpload } from "@prisma/client";

type AgsUploadSummary = {
  numNewRecords: number;
  numUpdatedRecords: number;
  mapping: AgsMapping<any>;
};

type AgsUploadSummaryBlob = {
  newRecords: ObjectWithStringKeys[];
  updatedRecords: ObjectWithStringKeys[];
  mappingKey: keyof typeof mappings;
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

  const agsGroups = Object.entries(mappings).map(async ([key, mapping]) => {
    const agsGroup = ags.agsData[mapping.agsTableName];
    const records = parseAgsGroup(agsGroup, mapping);
    const { newRecords, updatedRecords } = await mapping.findExistingRecords(
      // @ts-ignore We can ignore as we have already parsed and validated with zod
      records.parsedRecords,
      projectId
    );

    return {
      newRecords,
      updatedRecords,
      mapping,
      key,
    };
  });

  const groups = await Promise.all(agsGroups);

  saveRecordsToBlob(
    uploadId,
    groups.map((group) => ({
      newRecords: group.newRecords,
      updatedRecords: group.updatedRecords,
      mappingKey: group.key as keyof typeof mappings,
    }))
  );

  const agsUploadSummary: AgsUploadSummary[] = groups.map((group) => {
    return {
      mapping: group.mapping,
      numNewRecords: group.newRecords.length,
      numUpdatedRecords: group.updatedRecords.length,
    };
  });

  return agsUploadSummary;
}

export async function uploadToPrismaFromBlob(upload: AgsUpload) {
  const blob = readFileSync(`./uploads/${upload.id}.json`, "utf-8");
  const agsUpload: AgsUploadSummaryBlob[] = JSON.parse(blob);
  console.log(agsUpload);

  agsUpload.forEach(async (group) => {
    const mapping = mappings[group.mappingKey];

    // @ts-ignore We can ignore as we have already parsed and validated with zod
    await mapping.createRecords(group.newRecords, upload.projectId);
    // @ts-ignore We can ignore as we have already parsed and validated with zod
    await mapping.updateRecords(group.updatedRecords);
  });
}
