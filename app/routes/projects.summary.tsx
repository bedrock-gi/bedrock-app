import { LoaderFunction, json, LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "../db.server";
import { Project, User } from "@prisma/client";
import { authenticator, requireUser } from "~/utils/auth.server";

// Loader function to fetch projects from the database
export const loader = (async ({ request }) => {
  const user = await requireUser(request);

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    include: { user: true },
  });

  return json({ projects, user });
}) satisfies LoaderFunction;

// ProjectsList component
export default function ProjectsList() {
  const { projects, user } = useLoaderData<typeof loader>();

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
