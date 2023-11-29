import { useMatches } from "@remix-run/react";
import ProjectSidebar from "./ProjectSidebar";
import HomeSidebar from "./HomeSidebar";

export const SidebarContent = () => {
  const matches = useMatches();
  const projectMatch = matches.find(
    (m) => m.id === "routes/projects.$projectId"
  );
  const projectId = projectMatch?.params.projectId;

  if (projectId) {
    return <ProjectSidebar projectId={projectId} />;
  }
  return <HomeSidebar />;
};
