import { Link } from "@remix-run/react";
import { MdArrowBack, MdHome, MdUpload, MdMap, MdGridOn } from "react-icons/md";
import type { SidebarLinkItem } from "~/types/sidebar";
import { SidebarLinkItems } from "./SidebarLinkItems";

interface Props {
  projectId: string;
}

export default function ProjectSidebar({ projectId }: Props) {
  const projectSidebarItems: SidebarLinkItem[] = [
    {
      to: `projects/${projectId}`,
      icon: <MdHome />,
      label: "Summary",
    },
    {
      to: `projects/${projectId}/upload`,
      icon: <MdUpload />,
      label: "Upload",
    },
    {
      to: `projects/${projectId}/mapping`,
      icon: <MdMap />,
      label: "Mapping",
    },
    {
      to: `projects/${projectId}/tables`,
      icon: <MdGridOn />,
      label: "Tables",
    },
  ];
  return (
    <div>
      <ul className="menu menu-md w-full bg-base-200">
        <li>
          <Link to="/projects">
            <MdArrowBack />
            Projects
          </Link>
        </li>
      </ul>
      <div className="divider"></div>
      <SidebarLinkItems items={projectSidebarItems} title="Project" />
    </div>
  );
}
