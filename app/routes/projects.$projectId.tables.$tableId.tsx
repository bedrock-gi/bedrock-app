import type { LoaderFunctionArgs } from "@remix-run/node";

import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";

import { mappings } from "~/models/ags/mappings";
import { tableDataFetchers } from "~/models/prisma/tableDataFetcher";
import { requireUserProjectRole } from "~/utils/auth.server";
import { ClientOnly } from "remix-utils/client-only";

import Grid from "~/components/Grid/Grid.client";
import { Suspense } from "react";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.projectId);

  invariant(params.tableId);

  const tableName = params.tableId;

  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);
  const cols = mappings[tableName as keyof typeof mappings].getTableColumns();

  const dataRows = await tableDataFetchers[
    tableName as keyof typeof tableDataFetchers
  ].findAll(params.projectId);

  return typedjson({ role, tableName, cols, dataRows });
};

export default function () {
  const { cols, dataRows } = useTypedLoaderData<typeof loader>();

  // console.log(cols, dataRows.length);

  return (
    <div className="h-full w-full overflow-scroll">
      <Suspense fallback={<div>Loading...</div>}>
        {typeof document !== "undefined" &&
          dataRows !== undefined &&
          dataRows.length > 0 && <Grid cols={cols} data={dataRows} />}
      </Suspense>
    </div>
  );
}
