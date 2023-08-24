import { prisma } from "~/db.server";
import { Location } from "@prisma/client";

export async function getLocations(projectId: string) {
  return await prisma.location.findMany({
    where: {
      projectId,
    },
  });
}

export async function getProjects(userId: string) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}
