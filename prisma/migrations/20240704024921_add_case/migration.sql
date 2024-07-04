/*
  Warnings:

  - You are about to drop the `Skin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Skin";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "document" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "skin" (
    "uuid" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "pattern_name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "weapon" TEXT NOT NULL,

    CONSTRAINT "skin_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "case" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "content" TEXT[],

    CONSTRAINT "case_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "porcentage" DOUBLE PRECISION NOT NULL,
    "caseUuid" TEXT NOT NULL,
    "skinUuid" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "Content_caseUuid_idx" ON "Content"("caseUuid");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_caseUuid_fkey" FOREIGN KEY ("caseUuid") REFERENCES "case"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_skinUuid_fkey" FOREIGN KEY ("skinUuid") REFERENCES "skin"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
