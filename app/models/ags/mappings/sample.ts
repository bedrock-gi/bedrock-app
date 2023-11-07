import { Sample, Location } from "@prisma/client";
import { SampleSchema } from "prisma/generated/zod";
import { z } from "zod";
import { prisma } from "~/db.server";
import { AgsMapping } from "~/types/agsMapping";

// TODO: finish basic method of checking if sample exists by continuing below method.
// after this is done, do the same thing with a child of SAMP table.
// Then, see if a class based method could be used to reduce code repetition.

export const sampleMapping: AgsMapping<
  Sample & {
    locationName: string;
  }
> = {
  agsTableName: "SAMP",
  prismaLabel: "sample",
  zodSchema: SampleSchema.omit({ locationId: true }).extend({
    locationName: z.string(),
  }),

  async findExistingRecords(records, projectId) {
    const existingRecords = await prisma.sample.findMany({
      where: {
        OR: records.map(
          ({
            depthTop,
            locationName,
            sampleType,
            sampleUniqueID,
            sampleReference,
          }) => {
            return {
              depthTop,
              location: {
                name: locationName,
                projectId,
              },
              sampleType,
              sampleReference,
              sampleUniqueID,
            };
          }
        ),
      },

      select: {
        depthTop: true,
        sampleType: true,
        sampleReference: true,
        sampleUniqueID: true,
        location: true,
      },
    });

    const recordsForCompareDb = new Set(
      existingRecords.map(({ location, ...rec }) => {
        return {
          ...rec,
          locationName: location.name,
        };
      })
    );
  },

  columns: {
    LOCA_ID: "locationName", // X Location reference,
    SAMP_TOP: "depthTop", // m 2DP Depth to top of sample
    SAMP_REF: "sampleReference", // X Sample reference
    SAMP_TYPE: "sampleType", // PA Sample type
    SAMP_ID: "sampleUniqueID", // ID Sample unique identifier
    SAMP_BASE: "depthBase", // m 2DP Depth to base of sample
    SAMP_DTIM: "dateAndTimeSampleTaken", // yyyy-mmddThh:mm Date and time sample taken
    SAMP_UBLO: "numBlowsRequired", // 0DP Number of blows required to drive sampler
    SAMP_CONT: "sampleContainer", // X Sample container
    SAMP_PREP: "samplePreparation", // X Details of sample preparation at the time of sampling
    SAMP_SDIA: "sampleDiameter", // mm 0DP Sample diameter
    SAMP_WDEP: "depthToWaterBelowGroundSurface", // m 2DP Depth to water below ground surface at the time of sampling
    SAMP_RECV: "percentageSampleRecovered", // % 0DP Percentage of sample recovered
    SAMP_TECH: "samplingTechnique", // X Sample QA type (Normal, blank, or spike)
    SAMP_MATX: "sampleMatrix", // X Sample matrix
    SAMP_TYPC: "sampleQAType", // X Sample QA type (Normal, blank, or spike)
    SAMP_WHO: "samplerInitials", // X Samplers initials or name
    SAMP_WHY: "reasonForSampling", // X Reason for sampling
    SAMP_REM: "sampleRemarks", // X Sample remarks
    SAMP_DESC: "sampleDescription", // X Sample/specimen description
    SAMP_DESD: "dateSampleDescribed", // yyyy-mmdd Date sample described
    SAMP_LOG: "personResponsibleForDescription", // X Person responsible for sample/specimen description
    SAMP_COND: "sampleCondition", // X Condition and representativeness of sample
    SAMP_CLSS: "sampleClassification", // X Sample classification as required by EN ISO 14688-1
    SAMP_BAR: "barometricPressure", // bar 1DP Barometric pressure at the time of sampling
    SAMP_TEMP: "sampleTemperature", // DegC 0DP Sample temperature at the time of sampling
    SAMP_PRES: "gasPressureAboveBarometric", // bar 1DP Gas pressure (above barometric)
    SAMP_FLOW: "gasFlowRate", // l/min 1DP Gas flow rate
    SAMP_ETIM: "dateAndTimeSamplingCompleted", // yyyy-mmddThh:mm Date and time sampling completed
    SAMP_DURN: "samplingDuration", // hh:mm:ss T Sampling duration
    SAMP_CAPT: "captionUsedToDescribeSample", // X Caption used to describe sample
    SAMP_LINK: "sampleRecordLink", // RL Sample record link
    GEOL_STAT: "stratumReference", // X Stratum reference shown on trial pit or traverse sketch
    FILE_FSET: "associatedFileReference", // X Associated file reference (e.g. sampling field sheets, sample description records)
    SAMP_RECL: "lengthSampleRecovered", // mm 0DP Length of sample recovered
  },
};
