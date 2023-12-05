import { useMatches } from "@remix-run/react";
import ProjectSidebar from "./ProjectSidebar";
import HomeSidebar from "./HomeSidebar";
import TableSidebar from "./TableSidebar";

export const SidebarContent = () => {
  const matches = useMatches();
  const projectMatch = matches.find(
    (m) => m.id === "routes/projects.$projectId"
  );
  const projectId = projectMatch?.params.projectId;

  const projectTablesMatch = matches.find(
    (m) => m.id === "routes/projects.$projectId.tables"
  );

  if (projectTablesMatch && projectId) {
    return <TableSidebar projectId={projectId} />;
  }

  if (projectId) {
    return <ProjectSidebar projectId={projectId} />;
  }
  return <HomeSidebar />;
};
