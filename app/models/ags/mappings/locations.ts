import { ColumnRaw, GroupRaw } from "~/models/ags/models";
import {
  AgsMapping,
  DataColumns,
  makeSchemaCoercePrimitives,
  parseAgsGroup,
  prepareAgsZodSchema,
} from "../mappingUtils";
import { Location } from "@prisma/client";
import { z } from "zod";
import { LocationSchema } from "prisma/generated/zod";

export const locationMapping: AgsMapping<Omit<Location, "projectId">> = {
  agsTableName: "LOCA",
  prismaLabel: "location",
  columns: {
    LOCA_ID: "name",
    LOCA_LAT: "latitude",
    LOCA_LON: "longitude",
  },
  zodSchema: prepareAgsZodSchema(LocationSchema).omit({
    projectId: true,
  }),
};
