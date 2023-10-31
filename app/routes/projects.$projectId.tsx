import type { LoaderArgs } from "@remix-run/node";
import type { RouteMatch } from "@remix-run/react";
import { Link, Outlet } from "@remix-run/react";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { requireUserProjectRole } from "~/utils/auth.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.projectId);

  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);

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
