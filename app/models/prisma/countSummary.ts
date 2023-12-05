import { TableSidebarData } from "~/types/sidebar";
import { tableDataFetchers } from "./tableDataFetcher";
import { tableHierarchy } from "./hierarchy";

const getTableCountsForHierarchy = async (
  projectId: string,
  hierarchy: TableSidebarData
) => {
  const tableCount = await tableDataFetchers[
    hierarchy.name as keyof typeof tableDataFetchers
  ].getCount(projectId);
  hierarchy.count = tableCount;

  if (hierarchy.children) {
    hierarchy.children = await Promise.all(
      hierarchy.children.map((child) =>
        getTableCountsForHierarchy(projectId, child)
      )
    );
  }
  return hierarchy;
};

export const getTableCountsForSidebar = async (projectId: string) => {
  return await getTableCountsForHierarchy(projectId, tableHierarchy);
};
