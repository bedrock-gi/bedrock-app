/*
  Warnings:

  - You are about to drop the column `depthToBase` on the `Sample` table. All the data in the column will be lost.
  - You are about to drop the column `depthToTop` on the `Sample` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "depthToBase",
DROP COLUMN "depthToTop",
ADD COLUMN     "depthBase" DOUBLE PRECISION,
ADD COLUMN     "depthTop" DOUBLE PRECISION;
