import { Link } from "@remix-run/react";

export function Sidebar() {
  return (
    <ul className="menu rounded-box h-full bg-base-200">
      <li className="menu-title">Bedrock</li>
      <li>
        <Link to="/projects">Projects</Link>
      </li>
    </ul>
  );
}
