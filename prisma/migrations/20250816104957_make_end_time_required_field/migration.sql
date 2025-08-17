/*
  Warnings:

  - Made the column `endTime` on table `ServiceRecord` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ServiceRecord" ALTER COLUMN "endTime" SET NOT NULL;
