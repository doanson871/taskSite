-- AlterTable
ALTER TABLE "members" ALTER COLUMN "seen" SET DEFAULT false;

-- AlterTable
ALTER TABLE "postjobs" ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ALTER COLUMN "isReadNotification" SET DEFAULT false;
