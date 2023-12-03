import { Link } from "@remix-run/react";
import { MdArrowBack, MdHome, MdUpload, MdMap, MdGridOn } from "react-icons/md";

interface Props {
  projectId: string;
}

export default function ProjectSidebar({ projectId }: Props) {
  return (
    <div>
      <ul className="menu menu-md w-full bg-base-200">
        <li className="text-secondary">
          <Link to="/projects">
            <MdArrowBack />
            Projects
          </Link>
        </li>
      </ul>
      <div className="divider"></div>

      <ul className="menu menu-md w-full bg-base-200">
        <li className="menu-title">Project Menu</li>
        <li>
          <Link to={`projects/${projectId}`}>
            Summary
            <MdHome />
          </Link>

          <Link to={`projects/${projectId}/upload`}>
            Upload
            <MdUpload />
          </Link>
          <Link to={`projects/${projectId}`}>
            Mapping
            <MdMap />
          </Link>
          <Link to={`projects/${projectId}/tables`}>
            Tables
            <MdGridOn />
          </Link>
        </li>
      </ul>
    </div>
  );
}
