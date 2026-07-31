/*
  Warnings:

  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ru', 'en');

-- DropIndex
DROP INDEX "Profile_email_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "region",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'en';

-- CreateIndex
CREATE UNIQUE INDEX "Profile_accountId_key" ON "Profile"("accountId");
