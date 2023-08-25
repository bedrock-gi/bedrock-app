import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export default function Projects() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Projects</h1>

      <Outlet />
    </div>
  );
}
