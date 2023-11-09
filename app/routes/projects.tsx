import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { requireUser } from "~/utils/auth.server";

export const loader = (async ({ request }) => {
  const user = await requireUser(request);

  return json({ user });
}) satisfies LoaderFunction;

export const handle = {
  breadcrumb: () => <Link to="/projects">Projects</Link>,
};

export default function Projects() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
