/*
  Warnings:

  - A unique constraint covering the columns `[name,projectId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId,sampleUniqueID,sampleType,depthTop,sampleReference]` on the table `Sample` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserProject" ALTER COLUMN "role" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_projectId_key" ON "Location"("name", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Sample_locationId_sampleUniqueID_sampleType_depthTop_sample_key" ON "Sample"("locationId", "sampleUniqueID", "sampleType", "depthTop", "sampleReference");
