/*
  Warnings:

  - Added the required column `locationId` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "associatedFileReference" TEXT,
ADD COLUMN     "barometricPressure" DOUBLE PRECISION,
ADD COLUMN     "captionUsedToDescribeSample" TEXT,
ADD COLUMN     "dateAndTimeSampleTaken" TIMESTAMP(3),
ADD COLUMN     "dateAndTimeSamplingCompleted" TIMESTAMP(3),
ADD COLUMN     "dateSampleDescribed" TIMESTAMP(3),
ADD COLUMN     "depthToBase" DOUBLE PRECISION,
ADD COLUMN     "depthToTop" DOUBLE PRECISION,
ADD COLUMN     "depthToWaterBelowGroundSurface" DOUBLE PRECISION,
ADD COLUMN     "gasFlowRate" DOUBLE PRECISION,
ADD COLUMN     "gasPressureAboveBarometric" DOUBLE PRECISION,
ADD COLUMN     "lengthSampleRecovered" DOUBLE PRECISION,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "numBlowsRequired" INTEGER,
ADD COLUMN     "percentageSampleRecovered" DOUBLE PRECISION,
ADD COLUMN     "personResponsibleForDescription" TEXT,
ADD COLUMN     "reasonForSampling" TEXT,
ADD COLUMN     "sampleClassification" TEXT,
ADD COLUMN     "sampleCondition" TEXT,
ADD COLUMN     "sampleContainer" TEXT,
ADD COLUMN     "sampleDescription" TEXT,
ADD COLUMN     "sampleDiameter" DOUBLE PRECISION,
ADD COLUMN     "sampleMatrix" TEXT,
ADD COLUMN     "samplePreparation" TEXT,
ADD COLUMN     "sampleQAType" TEXT,
ADD COLUMN     "sampleRecordLink" TEXT,
ADD COLUMN     "sampleReference" TEXT,
ADD COLUMN     "sampleRemarks" TEXT,
ADD COLUMN     "sampleTemperature" DOUBLE PRECISION,
ADD COLUMN     "sampleType" TEXT,
ADD COLUMN     "sampleUniqueID" TEXT,
ADD COLUMN     "samplerInitials" TEXT,
ADD COLUMN     "samplingDuration" TEXT,
ADD COLUMN     "samplingTechnique" TEXT,
ADD COLUMN     "stratumReference" TEXT;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
