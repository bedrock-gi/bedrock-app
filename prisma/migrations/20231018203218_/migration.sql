-- CreateEnum
CREATE TYPE "DataType" AS ENUM ('STRING', 'NUMBER');

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "customColumns" JSONB;

-- CreateTable
CREATE TABLE "ColumnDefinition" (
    "id" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "dataType" "DataType" NOT NULL,

    CONSTRAINT "ColumnDefinition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ColumnDefinition" ADD CONSTRAINT "ColumnDefinition_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
