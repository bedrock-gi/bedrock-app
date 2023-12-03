import type { LoaderFunctionArgs } from "@remix-run/node";

import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { requireUserProjectRole } from "~/utils/auth.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.projectId);

  invariant(params.tableId);

  const tableName = params.tableId;

  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);

  return typedjson({ role, tableName });
};

export default function () {
  const { tableName } = useTypedLoaderData<typeof loader>();

  return <div>{tableName}</div>;
}