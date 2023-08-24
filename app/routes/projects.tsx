import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export default function Projects() {
  return (
    <div>
      <h1>Projects Page</h1>

      <Outlet />
    </div>
  );
}
