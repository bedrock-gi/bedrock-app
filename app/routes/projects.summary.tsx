import { LoaderFunction, json, LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "../db.server";
import { Project, User } from "@prisma/client";
import { authenticator, requireUser } from "~/utils/auth.server";

import { getProjects } from "~/models/projects";

export const loader = (async ({ request }) => {
  const user = await requireUser(request);

  const projects = await getProjects(user.id);

  return json({ projects });
}) satisfies LoaderFunction;

export default function () {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2> {project.name}</h2>
          </li>
        ))}
      </ul>
      <Link to="/projects/create">Create a New Project</Link>
    </div>
  );
}
