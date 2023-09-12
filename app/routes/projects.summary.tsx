import {
  LoaderFunction,
  json,
  LinksFunction,
  LoaderArgs,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "../db.server";
import { Project, User } from "@prisma/client";
import { authenticator, requireUser } from "~/utils/auth.server";

import { getProjects } from "~/models/projects";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="card w-4/5 bg-base-100 shadow-xl">
      <figure>
        <img src="https://picsum.photos/id/1005/400/250" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{project.name}</h2>
        <p>{project.description}</p>
        <div className="card-actions justify-end">
          <Link className="btn btn-primary" to={`/projects/${project.id}`}>
            Open
          </Link>
        </div>
      </div>
    </div>
  );
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  const projects = await getProjects(user.id);

  return typedjson({ projects });
};

export default function () {
  const { projects } = useTypedLoaderData<typeof loader>();

  return (
    <div className="m-2 flex flex-col gap-2">
      <div className="justify-left flex items-center gap-8">
        <Link className="btn btn-primary" to="/projects/create">
          New Project
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-2 ">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}
