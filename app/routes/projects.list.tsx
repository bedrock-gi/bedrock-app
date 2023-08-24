import { LoaderFunction, json, LinksFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "../db.server";
import { Project, User } from "@prisma/client";

// Loader function to fetch projects from the database
export const loader = (async () => {
  const projects = await prisma.project.findMany({
    include: { user: true },
  });

  return json({ projects });
}) satisfies LoaderFunction;

// ProjectsList component
export default function ProjectsList() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-4 text-2xl font-bold">Projects</h1>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="border p-4">
            <h2 className="text-lg font-semibold">{project.name}</h2>
          </li>
        ))}
      </ul>
      <Link
        to="/projects/create"
        className="mt-4 text-blue-500 hover:underline"
      >
        Create a New Project
      </Link>
    </div>
  );
}
