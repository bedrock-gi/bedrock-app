import type { LoaderFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import { requireUser } from "~/utils/auth.server";

import { typedjson, useTypedLoaderData } from "remix-typedjson";
import ProjectsMap from "~/components/Map/ProjectsMap";
import { getProjectsWithLocations } from "~/models/prisma/projects";

export const loader = (async ({ request }) => {
  const user = await requireUser(request);

  const projects = await getProjectsWithLocations(user.id);

  return typedjson({ projects });
}) satisfies LoaderFunction;

export default function () {
  const { projects } = useTypedLoaderData<typeof loader>();
  const navigator = useNavigate();

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
        <div>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  className="hover cursor-pointer"
                  key={project.id}
                  onClick={() => navigator(`../${project.id}`)}
                >
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-screen">
        <ProjectsMap projects={projects}></ProjectsMap>
      </div>
    </div>
  );
}
