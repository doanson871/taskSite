-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "employeeId" INTEGER;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
