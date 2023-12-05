import { Link } from "@remix-run/react";
import { useState } from "react";
import { TableSidebarData } from "~/types/sidebar";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface Props {
  projectId: string;
  sidebarData: TableSidebarData;
  open?: boolean;
}

export default function TableSidebarItems({
  sidebarData,
  projectId,
  open,
}: Props) {
  // recursive function to render the sidebar items

  const [childrenOpen, setChildrenOpen] = useState(true);

  return (
    sidebarData && (
      <li>
        <span>
          <Link to={`/projects/${projectId}/tables/${sidebarData.name}`}>
            <span className={`justify-between  `}>
              {sidebarData.label} ({sidebarData.count}){" "}
            </span>
          </Link>

          {sidebarData.children?.length > 0 && (
            <button
              className="btn h-full"
              onClick={() => setChildrenOpen(!childrenOpen)}
            >
              {childrenOpen ? <MdExpandLess /> : <MdExpandMore />}
            </button>
          )}
        </span>
        {sidebarData.children && (
          <ul
            className={`menu-dropdown ${
              childrenOpen ? "menu-dropdown-show" : ""
            }`}
          >
            {sidebarData.children.map((child) => (
              <TableSidebarItems
                key={child.name}
                sidebarData={child}
                projectId={projectId}
                open={childrenOpen}
              />
            ))}
          </ul>
        )}
      </li>
    )
  );
}
