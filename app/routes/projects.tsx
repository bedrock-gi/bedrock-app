import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getProjects } from "~/models/projects";
import { requireUser } from "~/utils/auth.server";

export const loader = (async ({ request }) => {
  const user = await requireUser(request);

  return json({ user });
}) satisfies LoaderFunction;

export default function Projects() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Welcome, {user.email}</h1>
      <h1 className="mb-4 text-2xl font-bold">Projects</h1>

      <Outlet />
    </div>
  );
}
