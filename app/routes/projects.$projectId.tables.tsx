import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { requireUserProjectRole } from "~/utils/auth.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.projectId);

  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);

  return typedjson({ role });
};

export default function () {
  return (
    <div>
      <Outlet />
    </div>
  );
}
