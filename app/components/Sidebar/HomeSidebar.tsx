import { MdHome, MdGroups } from "react-icons/md";
import type { SidebarLinkItem } from "~/types/sidebar";
import { SidebarLinkItems } from "./SidebarLinkItems";

export default function HomeSidebar() {
  const projectSidebarItems: SidebarLinkItem[] = [
    {
      to: "/projects",
      icon: <MdHome />,
      label: "Projects",
    },
    {
      to: "/projects",
      icon: <MdGroups />,
      label: "Teams",
    },
  ];

  return (
    <div>
      <SidebarLinkItems items={projectSidebarItems} />
    </div>
  );
}
