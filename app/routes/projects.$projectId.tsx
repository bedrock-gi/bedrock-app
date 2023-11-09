import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { redirect, typedjson } from "remix-typedjson";
import { requireUserProjectRole } from "~/utils/auth.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
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
  breadcrumb: (match: any) => {
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
