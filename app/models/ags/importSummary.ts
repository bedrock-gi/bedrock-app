import { Ags } from "./models";
import { mappings } from "./mappings";

import type AgsMapping from "../../types/agsMapping";

import { parseAgsGroup } from "./parse";
import { ObjectWithStringKeys } from "../../types/agsMapping";
import { writeFileSync } from "fs";

type AgsUploadSummary = {
  numNewRecords: number;
  numUpdatedRecords: number;
  mapping: AgsMapping<any>;
};

// type AgsRecordsBlob = {
//   newRecords: ObjectWithStringKeys[];
//   updatedRecords: ObjectWithStringKeys[];
//   mappingKey: keyof typeof mappings;
//   uploadId: string;
// };

function saveRecordsToBlob(
  uploadId: string,
  newRecords: ObjectWithStringKeys[],
  updatedRecords: ObjectWithStringKeys[],
  mappingKey: keyof typeof mappings
) {
  const asJson = JSON.stringify({
    newRecords,
    updatedRecords,
    mappingKey,
  });

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

  groups.forEach((group) => {
    saveRecordsToBlob(
      uploadId,
      group.newRecords,
      group.updatedRecords,
      group.key as keyof typeof mappings
    );
  });

  const agsUploadSummary: AgsUploadSummary[] = groups.map((group) => {
    return {
      mapping: group.mapping,
      numNewRecords: group.newRecords.length,
      numUpdatedRecords: group.updatedRecords.length,
    };
  });

  return agsUploadSummary;
}
