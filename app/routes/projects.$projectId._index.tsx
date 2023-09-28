import { Location } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { RouteMatch, Link } from "@remix-run/react";
import { Marker } from "react-map-gl";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { LocationsMap } from "~/components/Map/LocationsMap";
import { MapView } from "~/components/Map/Map";
import { Table } from "~/components/Table/Table";
import { TableConfig } from "~/components/Table/TableConfig";
import { getLocations, seedLocations } from "~/models/locations";
import { getProject } from "~/models/projects";
import { requireUser, requireUserProjectRole } from "~/utils/auth.server";

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
