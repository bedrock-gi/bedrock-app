import type { LoaderFunctionArgs } from "@remix-run/node";

import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import Grid from "~/components/Grid/Grid";

import { mappings } from "~/models/ags/mappings";
import { requireUserProjectRole } from "~/utils/auth.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.projectId);

  invariant(params.tableId);

  const tableName = params.tableId;

  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);
  const cols = mappings[tableName as keyof typeof mappings].getTableColumns();

  return typedjson({ role, tableName, cols });
};

export default function () {
  const { cols } = useTypedLoaderData<typeof loader>();

  return (
    <div className="h-full w-full overflow-scroll">
      <Grid cols={cols} data={[]} />
    </div>
  );
}
