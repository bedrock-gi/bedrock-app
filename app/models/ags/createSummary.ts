import { Ags } from "./models";
import { mappings } from "./mappings";

import type AgsMapping from "../../types/agsMapping";
import type { DataColumns, ObjectWithStringKeys } from "../../types/agsMapping";
import { parseAgsGroup } from "./parse";

type PrismaRecordCollection = {
  records: DataColumns<ObjectWithStringKeys>[];
  mapping: AgsMapping<ObjectWithStringKeys>;
};

type AgsUploadSummary = PrismaRecordCollection & {
  newRecords: number;
  updatedRecords: number;
};

export async function createAgsImportSummary(
  inputFile: string,
  projectId: string
) {
  const ags = new Ags(inputFile);

  // @ts-ignore
  const agsGroups: PrismaRecordCollection[] = Object.entries(mappings).map(
    ([key, mapping]) => {
      const agsGroup = ags.agsData[mapping.agsTableName];
      const records = parseAgsGroup(agsGroup, mapping);

      return {
        records: records.parsedRecords,
        mapping,
      };
    }
  );

  const agsUploadSummary: AgsUploadSummary[] = agsGroups.map((group) => {
    const { records, mapping } = group;

    const numNewRecords = records.filter(async (record) => {
      return await !mapping.checkIfRecordExists(record, projectId);
    }).length;
    const numUpdatedRecords = records.length - numNewRecords;

    return {
      ...group,
      newRecords: numNewRecords,
      updatedRecords: numUpdatedRecords,
    };
  });

  return agsUploadSummary;
}
