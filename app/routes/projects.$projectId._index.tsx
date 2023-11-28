import type { Location } from "@prisma/client";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { LocationsMap } from "~/components/Map/LocationsMap";
import { Table } from "~/components/Table/Table";
import { TableConfig } from "~/components/Table/TableConfig";
import { locationMapping } from "~/models/ags/mappings/location";
import { getLocations } from "~/models/prisma/locations";

import { requireUserProjectRole } from "~/utils/auth.server";

const locationTableConfig = new TableConfig<Location>(
  "loca",
  "Locations",
  locationMapping
);

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.projectId);

  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);

  const locations = await getLocations(params.projectId);

  return typedjson({ locations, role });
}

export default function () {
  const { locations } = useTypedLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-2">
      <div className="h-screen overflow-scroll">
        <Table tableConfig={locationTableConfig} data={locations} />
      </div>
      <div className="h-screen">
        <LocationsMap locations={locations} />
      </div>
    </div>
  );
}
