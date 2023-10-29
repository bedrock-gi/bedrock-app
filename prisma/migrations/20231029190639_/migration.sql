-- AlterTable
ALTER TABLE "AgsUpload" ADD COLUMN     "newRecordsCount" INTEGER,
ADD COLUMN     "parsedRecordsUrl" TEXT,
ADD COLUMN     "updatedRecordsCount" INTEGER,
ALTER COLUMN "fileUrl" DROP NOT NULL;
