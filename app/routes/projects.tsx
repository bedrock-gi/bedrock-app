import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getProjects } from "~/models/projects";
import { requireUser } from "~/utils/auth.server";
import { useMatches } from "@remix-run/react";

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
