import { Project, Role } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getProjects(userId: string) {
  const projects = await prisma.userProject.findMany({
    where: {
      userId,
    },
    include: {
      project: true,
    },
  });
  return projects.map(({ project }) => project);
}

export async function getProject(projectId: string) {
  return await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
}

export async function createProject(
  userId: string,
  name: string,
  description: string
) {
  return await prisma.userProject.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      role: Role.OWNER,
      project: {
        create: {
          name,
          description,
        },
      },
    },
  });
}
