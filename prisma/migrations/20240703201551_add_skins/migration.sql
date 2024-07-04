-- CreateTable
CREATE TABLE "Skin" (
    "uuid" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "pattern_name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "weppon" TEXT NOT NULL,

    CONSTRAINT "Skin_pkey" PRIMARY KEY ("uuid")
);
