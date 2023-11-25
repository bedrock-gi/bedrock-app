import { useMatches } from "@remix-run/react";
import { MdClose, MdMenu } from "react-icons/md";
import ProjectSidebar from "./ProjectSidebar";
import HomeSidebar from "./HomeSidebar";

type Props = {
  isExpanded: boolean;
  toggle: () => void;
};

export function Sidebar({ isExpanded, toggle }: Props) {
  const matches = useMatches();
  // console.log(matches);
  const projectMatch = matches.find(
    (m) => m.id === "routes/projects.$projectId"
  );

  const projectId = projectMatch?.params.projectId;

  return (
    <div className="h-full bg-base-200 transition-all duration-300">
      <div className="flex w-full justify-between p-4 align-middle">
        {isExpanded && <h1 className="text-2xl font-bold">Bedrock</h1>}
        <button
          onClick={toggle}
          className=" justify-self btn rounded-full p-2 hover:bg-base-300"
        >
          {!isExpanded ? <MdMenu /> : <MdClose />}
        </button>
      </div>

      {isExpanded && projectMatch !== undefined && projectId && (
        // back button
        <ProjectSidebar projectId={projectId} />
      )}

      {isExpanded && !projectMatch && (
        // back button
        <HomeSidebar />
      )}
    </div>
  );
}
