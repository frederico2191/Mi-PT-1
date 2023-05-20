import React, { useContext } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import MapWrapper from "./MapWrapper";
import { Context } from "../store/appContext";

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
  const { store } = useContext(Context);

  const cityResultPosition = () => {
    const coords = {
      lat: Number(store.searchedCityObject?.latitude),
      lng: Number(store.searchedCityObject?.longitude),
    };
    return store.searchedCityObject ? coords : null;
  };

  return (
    <MapWrapper setMarkerPosition={setMarkerPosition}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={cityResultPosition() || markerPosition}
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
