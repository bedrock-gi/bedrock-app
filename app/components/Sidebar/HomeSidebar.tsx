import { Link } from "@remix-run/react";
import { MdArrowBack, MdHome, MdGroups } from "react-icons/md";

export default function HomeSidebar() {
  return (
    <div>
      <ul className="menu menu-md w-full bg-base-200">
        <li>
          <Link to={`/projects`}>
            Projects
            <MdHome />
          </Link>

          <Link to={`/projects`}>
            Teams
            <MdGroups />
          </Link>
        </li>
      </ul>
    </div>
  );
}
