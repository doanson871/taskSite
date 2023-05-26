/*
  Warnings:

  - Added the required column `salary` to the `postjobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "postjobs" DROP COLUMN "salary",
ADD COLUMN     "salary" INTEGER NOT NULL;
