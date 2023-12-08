import type { LoaderFunctionArgs } from "@remix-run/node";

import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { mappings } from "~/models/ags/mappings";
import { requireUserProjectRole } from "~/utils/auth.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.projectId);

  invariant(params.tableId);

  const tableName = params.tableId;
  const zodSchema = mappings[tableName as keyof typeof mappings].zodSchema;

  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);

  return typedjson({ role, tableName, zodSchema });
};

export default function () {
  const { tableName, zodSchema } = useTypedLoaderData<typeof loader>();

  console.log("zodSchema", zodSchema);

  return <div></div>;
}
