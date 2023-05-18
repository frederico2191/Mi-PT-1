import React, { useState, useEffect, useCallback } from "react";
import { FiMapPin } from "react-icons/fi";
import Map from "./Map";
import { StandaloneSearchBox } from "@react-google-maps/api";
import "./LocationPicker2.css";

const LocationPicker2 = ({ setLocation, location }) => {
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMarkerPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const onMapClick = (e) => {
    setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setLocation({ ...location, lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox) {
      const place = searchBox.getPlaces()[0];
      if (place) {
        setMarkerPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setLocation({
          ...location,
          location: `${place.name}, ${place.formatted_address}`,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  return (
    <div>
      <div onClick={() => setShowMap(!showMap)}>
        {showMap ? "Hide Map" : <FiMapPin />}
      </div>

      {/* {showMap && ( */}
      {
        <div style={{ height: "400px" }}>
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Please insert address"
              style={{ width: "100%", height: "40px", paddingLeft: "10px" }}
            />
          </StandaloneSearchBox>
          <Map onMapClick={onMapClick} markerPosition={markerPosition} />
        </div>
      }
    </div>
  );
};

export default LocationPicker2;
