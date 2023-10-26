/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AgsUploadStatus" AS ENUM ('VALIDATED', 'CANCELLED', 'FAILED', 'COMPLETED');

-- CreateTable
CREATE TABLE "AgsUpload" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "status" "AgsUploadStatus" NOT NULL,

    CONSTRAINT "AgsUpload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- AddForeignKey
ALTER TABLE "AgsUpload" ADD CONSTRAINT "AgsUpload_userId_projectId_fkey" FOREIGN KEY ("userId", "projectId") REFERENCES "UserProject"("userId", "projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
