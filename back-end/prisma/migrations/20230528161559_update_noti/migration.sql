-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isReadNotification" BOOLEAN DEFAULT false;
