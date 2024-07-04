const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import skins from "./parsed_skins.json";

async function main() {
  for (const skin of skins as []) {
    await prisma.skin.create({
      data: skin,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
