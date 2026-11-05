/*
  Warnings:

  - You are about to drop the column `roles` on the `Account` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PermissionEffect" AS ENUM ('allow', 'deny');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "roles";

-- CreateTable
CREATE TABLE "AccountRole" (
    "accountId" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "AccountRole_pkey" PRIMARY KEY ("accountId","role")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "role" "Role" NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("role","permission")
);

-- CreateTable
CREATE TABLE "AccountPermission" (
    "accountId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "effect" "PermissionEffect" NOT NULL,

    CONSTRAINT "AccountPermission_pkey" PRIMARY KEY ("accountId","permission")
);

-- AddForeignKey
ALTER TABLE "AccountRole" ADD CONSTRAINT "AccountRole_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountPermission" ADD CONSTRAINT "AccountPermission_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
