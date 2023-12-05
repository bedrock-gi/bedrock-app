import { prisma } from "~/db.server";
import type { TableDataFetcher } from "./tableDataFetcher";
import type { Location } from "@prisma/client";

export async function getLocations(projectId: string) {
  return await prisma.location.findMany({
    where: {
      projectId,
    },
  });
}

export async function getCountPerProject(projectId: string) {
  return await prisma.location.count({
    where: {
      projectId,
    },
  });
}

export const locationTableDataFetcher: TableDataFetcher<Location> = {
  name: "location",
  label: "Locations",
  findAll: getLocations,
  getCount: getCountPerProject,
};
