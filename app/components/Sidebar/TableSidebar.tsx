import { Link } from "@remix-run/react";
import { MdArrowBack } from "react-icons/md";

import { useEffect } from "react";
import { useTypedFetcher } from "remix-typedjson";
import type { loader } from "~/routes/projects.$projectId.tables.sidebar";
import TableSidebarItems from "./TableSidebarItems";

interface Props {
  projectId: string;
}

export default function TableSidebar({ projectId }: Props) {
  const { load, data } = useTypedFetcher<typeof loader>();

  useEffect(() => {
    load(`projects/${projectId}/tables/sidebar`);
  }, [load, projectId]);

  return (
    <div>
      <ul className="menu menu-md w-full bg-base-200">
        <li>
          <Link to={`/projects/${projectId}`}>
            <MdArrowBack />
            Project
          </Link>
        </li>
      </ul>
      <div className="divider"></div>
      <ul className="menu menu-md w-full bg-base-200">
        {data && (
          <TableSidebarItems sidebarData={data.counts} projectId={projectId} />
        )}
      </ul>
    </div>
  );
}
