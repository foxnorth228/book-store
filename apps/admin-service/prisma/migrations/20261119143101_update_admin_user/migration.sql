-- DropIndex
DROP INDEX "AdminUser_email_key";

-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN     "profileUpdatedAt" TIMESTAMP(3),
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "accountCreatedAt" DROP NOT NULL,
ALTER COLUMN "accountUpdatedAt" DROP NOT NULL,
ALTER COLUMN "nickname" DROP NOT NULL;
