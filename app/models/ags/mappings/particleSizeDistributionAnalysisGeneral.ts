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
  async findExistingRecords(records, projectId) {
    const existingRecords;
  }
}

prisma.particleSizeDistributionAnalysisGeneral.create({
  data: {
    sample: {
      connect: {
        locationId_sampleUniqueID_sampleType_depthTop_sampleReference: {
          locationId,
        },
      },
    },
  },
});
