/*
  Warnings:

  - You are about to drop the column `language` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "language",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
ADD COLUMN     "surname" TEXT;

-- DropEnum
DROP TYPE "Language";
