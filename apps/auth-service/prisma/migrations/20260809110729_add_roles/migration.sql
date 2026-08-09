-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'moderator', 'admin');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['user']::"Role"[];
