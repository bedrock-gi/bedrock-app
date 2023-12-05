import type { Sample } from "@prisma/client";
import { prisma } from "~/db.server";
import type { TableDataFetcher } from "./tableDataFetcher";

export default async function getCountPerProject(projectId: string) {
  return await prisma.sample.count({
    where: {
      location: {
        projectId,
      },
    },
  });
}

export async function getSamples(projectId: string) {
  return await prisma.sample.findMany({
    where: {
      location: {
        projectId,
      },
    },
  });
}

export const sampleTableDataFetcher: TableDataFetcher<Sample> = {
  name: "sample",
  label: "Samples",
  getCount: getCountPerProject,
  findAll: getSamples,
};
