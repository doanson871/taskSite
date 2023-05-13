/*
  Warnings:

  - You are about to drop the column `contractId` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `descrition` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `contracts` table. All the data in the column will be lost.
  - The primary key for the `usersonworks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `postJobId` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user1Id` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `contracts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PROCESSING', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_contractId_fkey";

-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_userId_fkey";

-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_workId_fkey";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "contractId",
ADD COLUMN     "postJobId" INTEGER NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "address",
DROP COLUMN "createdAt",
DROP COLUMN "descrition",
DROP COLUMN "time",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
DROP COLUMN "workId",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "user1Id" INTEGER NOT NULL,
ADD COLUMN     "user2Id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "usersonworks" DROP CONSTRAINT "usersonworks_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "usersonworks_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "postjobs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "workId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "descrition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "postjobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "postjobs" ADD CONSTRAINT "postjobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postjobs" ADD CONSTRAINT "postjobs_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_postJobId_fkey" FOREIGN KEY ("postJobId") REFERENCES "postjobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
