import { prisma } from "~/db.server";
import { AgsMapping, DataColumns } from "../../../types/agsMappingConfig";

import type {
  Sample,
  ParticleSizeDistributionAnalysisGeneral,
} from "@prisma/client";

import {
  LocationSchema,
  LocationCreateManyArgsSchema,
} from "prisma/generated/zod";
import type { DataColumns } from "~/types/agsMapping";
import { prepareAgsZodSchema } from "../zod";
import { GetResult } from "@prisma/client/runtime";

class ParticleSizeDistributionAnalysisGeneralMapping extends AgsMapping<
  ParticleSizeDistributionAnalysisGeneral,
  Sample,
  {
    sampleId: string;
  },
  {
    name: string;
    depthTop: number;
    sampleType: string;
    sampleReference: string;
    sampleUniqueID: string;
  }
> {
  async findExistingRecords(
    records: Omit<
      DataColumns<ParticleSizeDistributionAnalysisGeneral> & {
        name: string;
        depthTop: number;
        sampleType: string;
        sampleReference: string;
        sampleUniqueID: string;
      },
      "sampleId"
    >[],

    projectId: string
  ) {
    // first need to find locationIDs
    const locations = await prisma.location.findMany({
      where: {
        projectId,
        name: {
          in: records.map((record) => record.name),
        },
      },
    });

    const existingRecords =
      await prisma.particleSizeDistributionAnalysisGeneral.findMany({
        where: {
          OR: records.map((record) => {
            return {
              AND: {
                sample: {
                  location: {
                    name: {
                      equals: record.name,
                    },
                    projectId: {
                      equals: projectId,
                    },
                  },
                },
              },
              depthTop: {
                equals: record.depthTop,
              },

              sampleType: {
                equals: record.sampleType,
              },

              sampleReference: {
                equals: record.sampleReference,
              },

              sampleUniqueID: {
                equals: record.sampleUniqueID,
              },
            };
          }),
        },
        include: {
          sample: {
            include: {
              location: true,
            },
          },
        },
      });
  }
}
