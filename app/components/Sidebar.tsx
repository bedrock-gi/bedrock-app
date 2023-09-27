import { Link } from "@remix-run/react";
import { useState } from "react";

interface Props {}

export function Sidebar({}: Props) {
  return (
    <ul className="menu rounded-box h-full bg-base-200">
      <li className="menu-title">Bedrock</li>
      <li>
        <Link to="/projects">Projects</Link>
      </li>
    </ul>
  );
}
