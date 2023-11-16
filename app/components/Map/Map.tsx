import type { ViewState } from "react-map-gl";
import {
  FullscreenControl,
  Map,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxAccessToken =
  "pk.eyJ1IjoiamFtZXNob2xjb21iZSIsImEiOiJjbG1xbnNhMm4wMnVoMmtxcjdueXE0c3NxIn0.juvcw-besqtIrzPwytRkxA";

interface Props {
  children?: React.ReactNode;
  viewState?: Partial<ViewState>;
}

export const MapView = ({ children, viewState }: Props) => {
  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      style={{
        width: "100%",
        height: "100%",
      }}
      initialViewState={viewState}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {children}
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
    </Map>
  );
};
