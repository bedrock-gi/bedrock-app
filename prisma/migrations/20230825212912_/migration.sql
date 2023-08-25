/*
  Warnings:

  - You are about to drop the column `nameLong` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `nameShort` on the `Project` table. All the data in the column will be lost.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "nameLong",
DROP COLUMN "nameShort",
ADD COLUMN     "name" TEXT NOT NULL;
