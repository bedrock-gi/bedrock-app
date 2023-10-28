import type { Location } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { LocationsMap } from "~/components/Map/LocationsMap";
import { Table } from "~/components/Table/Table";
import type { TableConfig } from "~/components/Table/TableConfig";
import { getLocations, seedLocations } from "~/models/prisma/locations";

import { requireUserProjectRole } from "~/utils/auth.server";

const locationTableConfig: TableConfig<Location> = {
  id: "loca",
  title: "Locations",
  columns: [
    {
      label: "Name",
      accessor: "name",
    },
    {
      accessor: "latitude",
    },
    {
      accessor: "longitude",
    },
  ],
};

export async function loader({ params, request }: LoaderArgs) {
  if (!params.projectId) {
    return redirect("/projects");
  }

  const role = await requireUserProjectRole(request, params.projectId);
  if (!role) {
    return redirect("/projects");
  }

  const locations = await getLocations(params.projectId);
  if (locations.length === 0) {
    await seedLocations(params.projectId);
  }

  return typedjson({ locations, role });
}

export default function () {
  const { locations, role } = useTypedLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-2">
      <div className="h-screen overflow-scroll">
        {/* link to upload data  */}
        <Link to={`/projects/${role.projectId}/upload`}>Upload Data</Link>

        <Table tableConfig={locationTableConfig} data={locations} />
      </div>
      <div className="h-screen">
        <LocationsMap locations={locations} />
      </div>
    </div>
  );
}
