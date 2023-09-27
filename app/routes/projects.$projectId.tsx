import { LoaderArgs } from "@remix-run/node";
import {
  Link,
  Outlet,
  RouteMatch,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { getProject } from "~/models/projects";

export const loader = async ({ params }: LoaderArgs) => {
  if (!params.projectId) {
    return redirect("/projects");
  }
  const project = await getProject(params.projectId);

  return typedjson({ project });
};

export const handle = {
  breadcrumb: (match: RouteMatch) => {
    console.log(match);
    return (
      <Link to={`/projects/${match.data.project.id}`}>
        {match.data.project.name}
      </Link>
    );
  },
};

export default function () {
  return (
    <div>
      <Outlet />
    </div>
  );
}
