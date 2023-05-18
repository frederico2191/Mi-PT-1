import React from "react";
import { GoogleMap, StandaloneSearchBox } from "@react-google-maps/api";

const LocationPicker4 = () => {
  const handlePlacesChanged = () => {
    // Handle the places changed event
  };

  return (
    <GoogleMap center={{ lat: 0, lng: 0 }} zoom={10}>
      <StandaloneSearchBox onPlacesChanged={handlePlacesChanged}>
        <input type="text" placeholder="Search for a location" />
      </StandaloneSearchBox>
    </GoogleMap>
  );
};

export default LocationPicker4;
