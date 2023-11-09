import type { Project } from "@prisma/client";
import { Link } from "@remix-run/react";

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="card w-4/5 bg-base-100 shadow-xl">
      <figure>
        <img src="https://picsum.photos/id/1005/400/250" alt="project" />
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
