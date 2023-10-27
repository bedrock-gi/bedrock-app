import { Ags } from "./models";
import { mappings } from "./mappings";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  AgsMapping,
  DataColumns,
  ObjectWithStringKeys,
  parseAgsGroup,
} from "./mappingUtils";

type PrismaRecordCollection = {
  records: DataColumns<ObjectWithStringKeys>[];
  mapping: AgsMapping<ObjectWithStringKeys>;
};

type AgsUploadSummary = PrismaRecordCollection & {
  newRecords: number;
  updatedRecords: number;
};

export async function createAgsImportSummary(inputFile: string) {
  const ags = new Ags(inputFile);

  console.log(ags.agsData);

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
      return await !mapping.checkIfRecordExists(record);
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
