/*
  Warnings:

  - The `status` column on the `applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusApply" AS ENUM ('PROCESSING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "status",
ADD COLUMN     "status" "StatusApply" NOT NULL DEFAULT 'PROCESSING';
