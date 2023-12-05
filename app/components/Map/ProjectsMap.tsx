import type { Project, Location } from "@prisma/client";
import { Marker } from "react-map-gl";
import { geoMidpoint } from "~/utils/calc";
import { MapView } from "./Map";

interface Props {
  projects: (Project & { locations: Location[] })[];
}

export default function ProjectsMap({ projects }: Props) {
  const projectsWithMidpoints = projects.map((project) => ({
    ...project,
    midpoint: geoMidpoint(project.locations),
  }));

  const projectsWithMidpointsWithLocations = projectsWithMidpoints.filter(
    (project) => project.locations.length > 0
  );

  const markers = projectsWithMidpointsWithLocations.map((project) => (
    <Marker
      key={project.id}
      latitude={project.midpoint.latitude}
      longitude={project.midpoint.longitude}
      style={{ width: "100px", height: "100px" }}
    ></Marker>
  ));

  const { latitude, longitude } = geoMidpoint(
    projectsWithMidpointsWithLocations.map((p) => p.midpoint)
  );

  return (
    <MapView
      viewState={{
        latitude,
        longitude,
        zoom: 8,
      }}
    >
      {markers}
    </MapView>
  );
}
