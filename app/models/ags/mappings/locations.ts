import { prisma } from "~/db.server";
import type { AgsMapping } from "../mappingUtils";
import { prepareAgsZodSchema } from "../mappingUtils";
import type { Location } from "@prisma/client";

import { LocationSchema } from "prisma/generated/zod";

export const locationMapping: AgsMapping<Omit<Location, "projectId">> = {
  agsTableName: "LOCA",
  prismaLabel: "location",
  checkIfRecordExists: async (record) => {
    const { name } = record;
    const existingRecord = await prisma.location.findMany({
      where: {
        name,
      },
    });
    return existingRecord.length > 0;
  },

  columns: {
    LOCA_ID: "name",
    LOCA_LAT: "latitude",
    LOCA_LON: "longitude",
  },
  zodSchema: prepareAgsZodSchema(LocationSchema).omit({
    projectId: true,
  }),
};
