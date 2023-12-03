import { Link } from "@remix-run/react";
import { MdArrowBack, MdHome, MdUpload, MdMap, MdGridOn } from "react-icons/md";

interface Props {}

export default function TableSidebar({}: Props) {
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
        <li className="menu-title"> Tables</li>
        <li></li>
      </ul>
    </div>
  );
}
