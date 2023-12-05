import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { requireUserProjectRole } from "~/utils/auth.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.projectId);

  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);

  return typedjson({ role });
};

export const handle = {
  breadcrumb: (match: any) => {
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
