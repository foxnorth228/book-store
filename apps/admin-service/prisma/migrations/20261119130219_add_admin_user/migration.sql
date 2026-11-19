-- CreateTable
CREATE TABLE "AdminUser" (
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "accountCreatedAt" TIMESTAMP(3) NOT NULL,
    "accountUpdatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "surname" TEXT,
    "nickname" TEXT NOT NULL,
    "syncedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("accountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AdminUser_email_idx" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AdminUser_nickname_idx" ON "AdminUser"("nickname");
