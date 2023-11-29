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

export const locationTableDataFetcher: TableDataFetcher<Location> = {
  name: "location",
  findAll: getLocations,
};
