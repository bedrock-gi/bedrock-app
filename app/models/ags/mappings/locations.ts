import { prisma } from "~/db.server";
import type AgsMapping from "../../../types/agsMapping";
import { prepareAgsZodSchema } from "../zod";
import type { Location } from "@prisma/client";

import { LocationSchema } from "prisma/generated/zod";

export const locationMapping: AgsMapping<Omit<Location, "projectId">> = {
  agsTableName: "LOCA",
  prismaLabel: "location",
  findExistingRecords: async (records, projectId) => {
    const existingRecords = await prisma.location.findMany({
      where: {
        projectId,
        name: {
          in: records.map((record) => record.name),
        },
      },
    });

    const newRecords = records.filter(
      (record) =>
        !existingRecords.find(
          (existingRecord) => existingRecord.name === record.name
        )
    );

    return {
      newRecords,
      updatedRecords: existingRecords,
    };
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
