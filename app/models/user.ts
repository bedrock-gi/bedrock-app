import { User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getUser(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function getOrCreateUser(email: string) {
  return await prisma.user.upsert({
    where: {
      email,
    },
    create: {
      email,
    },
    update: {},
  });
}
