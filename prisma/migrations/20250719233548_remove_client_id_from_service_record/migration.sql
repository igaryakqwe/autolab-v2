/*
  Warnings:

  - You are about to drop the column `clientId` on the `ServiceRecord` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceRecord" DROP CONSTRAINT "ServiceRecord_clientId_fkey";

-- AlterTable
ALTER TABLE "ServiceRecord" DROP COLUMN "clientId";
