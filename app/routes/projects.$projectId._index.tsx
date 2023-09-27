import { Location } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { RouteMatch, Link } from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { MapView } from "~/components/Map";
import { Table } from "~/components/Table/Table";
import { TableConfig } from "~/components/Table/TableConfig";
import { getLocations, seedLocations } from "~/models/locations";
import { getProject } from "~/models/projects";
import { requireUser } from "~/utils/auth.server";

const locationTableConfig: TableConfig<Location> = {
  id: "loca",
  title: "Locations",
  columns: [
    {
      label: "Name",
      accessor: "name",
    },
    {
      accessor: "easting",
    },
    {
      accessor: "northing",
    },
  ],
};

export async function loader({ params, request }: LoaderArgs) {
  requireUser(request);
  if (!params.projectId) {
    return redirect("/projects");
  }
  const project = await getProject(params.projectId);
  const locations = await getLocations(params.projectId);
  if (locations.length === 0) {
    await seedLocations(params.projectId);
  }

  return typedjson({ locations, project });
}

export default function () {
  const { locations, project } = useTypedLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-2">
      <div>
        <Table tableConfig={locationTableConfig} data={locations} />
      </div>
      <div className="h-screen">
        <MapView />
      </div>
    </div>
  );
}
