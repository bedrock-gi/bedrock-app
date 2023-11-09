import { prisma } from "~/db.server";
import { AgsUploadStatus } from "@prisma/client";

export async function createAgsUpload(
  projectId: string,
  userId: string,
  fileUrl: string
) {
  return await prisma.agsUpload.create({
    data: {
      fileUrl,
      userProject: {
        connect: {
          userId_projectId: {
            userId,
            projectId,
          },
        },
      },

      status: AgsUploadStatus.STARTED,
    },
  });
}

export async function getAgsUploads(projectId: string) {
  return await prisma.agsUpload.findMany({
    where: {
      userProject: {
        projectId,
      },
    },
  });
}

export async function getAgsUpload(id: string) {
  return await prisma.agsUpload.findUnique({
    where: {
      id,
    },
  });
}
