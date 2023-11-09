/*
  Warnings:

  - You are about to drop the column `latitudeStart` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `longitudeStart` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "latitudeStart",
DROP COLUMN "longitudeStart";
