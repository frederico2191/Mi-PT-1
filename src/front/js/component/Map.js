import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const mapContainerStyle = {
  width: "80%",
  height: "400px",
};

const Map = ({ onMapClick, markerPosition, children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDDZ4KCljuX_ugUKoGDSsdiswCVE0k_UY8",
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={markerPosition || { lat: 40.7128, lng: -74.006 }}
      onClick={onMapClick}
    >
      {window.google && markerPosition && <Marker position={markerPosition} />}
      {children}
    </GoogleMap>
  );
};

export default Map;
