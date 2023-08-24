import { Project } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getProjects(userId: string) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}

export async function getProject(projectId: string) {
  return await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
}

export async function createProject(userId: string, name: string) {
  return await prisma.project.create({
    data: {
      name,
      userId,
    },
  });
}
