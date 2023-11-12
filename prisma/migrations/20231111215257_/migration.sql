-- CreateTable
CREATE TABLE "ParticleSizeDistributionAnalysisGeneral" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sampleId" TEXT NOT NULL,
    "specimenReference" TEXT,
    "depthToTopOfSpecimen" DOUBLE PRECISION,
    "specimenDescription" TEXT,
    "detailsOfSpecimenPreparation" TEXT,
    "uniformityCoefficient" DOUBLE PRECISION,
    "percentageGreaterThan63mm" DOUBLE PRECISION,
    "percentageGravel" DOUBLE PRECISION,
    "percentageSand" DOUBLE PRECISION,
    "percentageSilt" DOUBLE PRECISION,
    "percentageClay" DOUBLE PRECISION,
    "percentageLessThan63um" DOUBLE PRECISION,
    "remarks" TEXT,
    "testMethod" TEXT,
    "testingLaboratory" TEXT,
    "accreditingBody" TEXT,
    "testStatus" TEXT,
    "associatedFileReference" TEXT,
    "depthToBaseOfSpecimen" DOUBLE PRECISION,
    "deviationFromTestProcedure" TEXT,
    "particleDensityUsedInCalculations" TEXT,
    "methodOfPreTreatment" TEXT,
    "soilTestSufficient" TEXT,
    "exclusionRemark" TEXT,
    "coefficientOfCurvature" DOUBLE PRECISION,

    CONSTRAINT "ParticleSizeDistributionAnalysisGeneral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParticleSizeDistributionAnalysisGeneral_sampleId_specimenRe_key" ON "ParticleSizeDistributionAnalysisGeneral"("sampleId", "specimenReference", "depthToTopOfSpecimen");

-- AddForeignKey
ALTER TABLE "ParticleSizeDistributionAnalysisGeneral" ADD CONSTRAINT "ParticleSizeDistributionAnalysisGeneral_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
