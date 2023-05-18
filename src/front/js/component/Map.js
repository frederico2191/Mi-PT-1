import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import MapWrapper from "./MapWrapper";

const defaultStyle = {
  width: "80%",
  height: "400px",
};

const Map = ({
  mapContainerStyle = defaultStyle,
  onMapClick,
  markerPosition,
  setMarkerPosition,
  children,
}) => {
  // const [markerPosition, setMarkerPosition] = useState({
  //   lat: 40.7128,
  //   lng: -74.006,
  // });
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyDDZ4KCljuX_ugUKoGDSsdiswCVE0k_UY8",
  //   libraries,
  // });

  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading maps";

  return (
    <MapWrapper setMarkerPosition={setMarkerPosition}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={markerPosition}
        onClick={onMapClick}
      >
        {window.google && markerPosition && (
          <MarkerF position={markerPosition} />
        )}
        {children}
      </GoogleMap>
    </MapWrapper>
  );
};

export default Map;
