import { Ags } from "./models";
import { mappings } from "./mappings";
import { prisma } from "~/db.server";
import {
  AgsMapping,
  DataColumns,
  ObjectWithStringKeys,
  parseAgsGroup,
} from "./mappingUtils";

type PrismaRecordCollection<T extends ObjectWithStringKeys> = {
  records: DataColumns<T>[];
  mapping: AgsMapping<T>;
};

interface PrismaRecordCollectionGroup {
  [key: string]: PrismaRecordCollection<any>;
}

export function loadAgsToPrisma(inputFile: string) {
  const ags = new Ags(inputFile);

  console.log(ags.agsData);

  const agsGroups = mappings.map((mapping) => {
    return parseAgsGroup(ags.agsData[mapping.agsTableName], mapping)
      .parsedRecords;
  });
  console.log("agsGroups");
  console.log(agsGroups);
  return agsGroups;
}
