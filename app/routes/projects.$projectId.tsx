import { LoaderArgs } from "@remix-run/node";
import {
  Link,
  Outlet,
  RouteMatch,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { json } from "stream/consumers";
import { getProject } from "~/models/projects";
import { requireUserProjectRole } from "~/utils/auth.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  if (!params.projectId) {
    return redirect("/projects");
  }

  const role = await requireUserProjectRole(request, params.projectId);
  if (!role) {
    return redirect("/projects");
  }

  return typedjson({ role });
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
