import { Link } from "@remix-run/react";
import { requireUser } from "~/utils/auth.server";
import { getProjectsWithLocations } from "~/models/projects";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import ProjectsMap from "~/components/Map/ProjectsMap";
import { ProjectCard } from "~/components/Project/ProjectCard";
import type { LoaderFunction } from "@remix-run/node";

export const loader = (async ({ request }) => {
  const user = await requireUser(request);

  const projects = await getProjectsWithLocations(user.id);

  return typedjson({ projects });
}) satisfies LoaderFunction;

export default function () {
  const { projects } = useTypedLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-2 justify-center">
      <div className="flex h-screen flex-col overflow-y-auto">
        <h1 className="m-3 text-lg uppercase tracking-wider text-gray-600">
          Projects
        </h1>

        <div className="justify-left flex items-center gap-4 px-3">
          <Link className="btn btn-primary" to="/projects/create">
            New Project
          </Link>
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered max-w-xs"
          />
        </div>
        <div className="m-3 grid grid-cols-2 justify-center gap-2 ">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>

      <div className="h-screen">
        <ProjectsMap projects={projects}></ProjectsMap>
      </div>
    </div>
  );
}
