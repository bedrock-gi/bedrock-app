import { prisma } from "~/db.server";
import { AgsMapping } from "../../../types/agsMappingConfig";

import type { Location } from "@prisma/client";

import {
  LocationSchema,
  LocationCreateManyArgsSchema,
} from "prisma/generated/zod";
import type { DataColumns } from "~/types/agsMappingConfig";
import { prepareAgsZodSchema } from "../zod";

export class LocationMapping extends AgsMapping<
  Location,
  {
    projectId: string;
  },
  {}
> {
  async createRecords(records: DataColumns<Location>[], projectId: string) {
    const recordsWithProjectId = records.map((record) => ({
      ...record,
      projectId,
    }));

    const input = LocationCreateManyArgsSchema.parse({
      data: recordsWithProjectId,
    });

    await prisma.location.createMany(input);
  }

  // async updateRecords(records: Location[]) {
  //   records.forEach(async (record) => {
  //     const location = LocationSchema.parse(record);

  //     await prisma.location.updateMany({
  //       where: {
  //         id: location.id,
  //       },
  //       data: location,
  //     });
  //   });
  // }

  //
}

export const locationMapping = new LocationMapping(
  ["projectId"],
  [],
  prepareAgsZodSchema(
    LocationSchema.omit({
      projectId: true,
    })
  ),

  "LOCA",
  "location",
  {
    LOCA_ID: "name",
    LOCA_LAT: "latitude",
    LOCA_LON: "longitude",
    LOCA_TYPE: "locationType",
    LOCA_STAT: "locationStatus",
    LOCA_NATE: "nationalEasting",
    LOCA_NATN: "nationalNorthing",
    LOCA_GREF: "gridReference",
    LOCA_GL: "groundLevel",
    LOCA_REM: "remarks",
    LOCA_FDEP: "finalDepth",
    LOCA_STAR: "startDate",
    LOCA_PURP: "purpose",
    LOCA_TERM: "termination",
    LOCA_ENDD: "endDate",
    LOCA_LETT: "gridReferenceLetter",
    LOCA_LOCX: "localGridX",
    LOCA_LOCY: "localGridY",
    LOCA_LOCZ: "localDatumLevel",
    LOCA_LREF: "localGridSystem",
    LOCA_DATM: "localDatumSystem",
    LOCA_ETRV: "endOfTraverseEasting",
    LOCA_NTRV: "endOfTraverseNorthing",
    LOCA_LTRV: "endOfTraverseGroundLevel",
    LOCA_XTRL: "localGridEasting",
    LOCA_YTRL: "localGridNorthing",
    LOCA_ZTRL: "localElevation",

    LOCA_ELAT: "latitudeEnd",
    LOCA_ELON: "longitudeEnd",
    LOCA_LLZ: "projectionFormat",
    LOCA_LOCM: "locationMethod",
    LOCA_LOCA: "locationSubdivision",
    LOCA_CLST: "phaseGrouping",
    LOCA_ALID: "alignmentId",
    LOCA_OFFS: "offset",
    LOCA_CNGE: "chainage",
    LOCA_TRAN: "transformDetails",
    FILE_FSET: "associatedFileReference",
    LOCA_NATD: "nationalDatum",
    LOCA_ORID: "originalHoleId",
    LOCA_ORJO: "originalJobReference",
    LOCA_ORCO: "originatingCompany",
  },

  ["name", "projectId"]
);
