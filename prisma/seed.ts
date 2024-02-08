import { prisma } from "@/pkg/services/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const password = await bcrypt.hash("admin", 10);

  const newUser = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "marlon.klemente@gmail.com",
      password: password,
      nameComplete: "Administrador",
      createdAt: new Date(),
      lastAccess: new Date(),
    },
  });
  console.log(`Created user: ${newUser.name} (ID: ${newUser.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
