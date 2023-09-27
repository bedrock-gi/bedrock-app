import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxAccessToken =
  "pk.eyJ1IjoiamFtZXNob2xjb21iZSIsImEiOiJjbG1xbnNhMm4wMnVoMmtxcjdueXE0c3NxIn0.juvcw-besqtIrzPwytRkxA";

export const MapView = () => {
  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      style={{
        width: "100%",
        height: "100%",
      }}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
};
