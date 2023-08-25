import { prisma } from "~/db.server";
import { Location } from "@prisma/client";

export async function getLocations(projectId: string) {
  return await prisma.location.findMany({
    where: {
      projectId,
    },
  });
}
