import type { Location } from "@prisma/client";
import { Marker } from "react-map-gl";
import { geoMidpoint } from "~/utils/calc";
import { MapView } from "./Map";

export interface Props {
  locations: Location[];
}

export function LocationsMap({ locations }: Props) {
  const { latitude, longitude } = geoMidpoint(locations);

  const markers = locations.map((location) => (
    <Marker
      key={location.id}
      latitude={location.latitude ?? 0}
      longitude={location.longitude ?? 0}
      style={{ width: "100px", height: "100px" }}
    ></Marker>
  ));

  return (
    <div className="h-screen">
      <MapView viewState={{ latitude, longitude, zoom: 8 }}>{markers}</MapView>
    </div>
  );
}
