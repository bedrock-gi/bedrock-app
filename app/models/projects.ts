import { Role } from "@prisma/client";
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

export async function getProjectsWithLocations(userId: string) {
  const projects = await prisma.userProject.findMany({
    where: {
      userId,
    },
    include: {
      project: {
        include: {
          locations: true,
        },
      },
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

export async function getProjectWithLocations(projectId: string) {
  return await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      locations: true,
    },
  });
}

export async function createProject(
  userId: string,
  name: string,
  description: string
) {
  return await prisma.project.create({
    data: {
      name,
      description,
      userProjects: {
        create: {
          user: {
            connect: {
              id: userId,
            },
          },

          role: Role.OWNER,
        },
      },
    },
  });
}

export async function getProjectRole(userId: string, projectId: string) {
  return await prisma.userProject.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId,
      },
    },
    include: {
      project: true,
    },
  });
}
