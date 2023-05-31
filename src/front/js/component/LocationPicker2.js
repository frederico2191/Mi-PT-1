import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { FiMapPin } from "react-icons/fi";
import Map from "./Map";
import { StandaloneSearchBox, useLoadScript } from "@react-google-maps/api";
import "./LocationPicker2.css";

const libraries = ["places"];
const LocationPicker2 = ({ setLocation, location }) => {
  const { store, actions } = useContext(Context);
  const [searchBox, setSearchBox] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 40.7128,
    lng: -74.006,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const marker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(marker);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [window.google, navigator.geolocation, store.processedResults]);

  const handleChange = (e) => {
    setLocation({ ...location, address: e.target.value });
  };
  const onMapClick = (e) => {
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
          address: `${place.name}, ${place.formatted_address}`,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  return (
    <div>
      <div style={{ height: "400px" }}>
        <StandaloneSearchBox
          onLoad={onSearchBoxLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <>
            <label htmlFor="search-box">Address</label>
            <input
              type="text"
              id="search-box"
              placeholder=" "
              value={location?.address || ""}
              onChange={handleChange}
              style={{
                paddingLeft: "15px",
                width: "100%",
                height: "56px",
                marginBottom: "1rem",
                marginTop: "10px",
                borderColor: "lightGrey",
                borderRadius: "5px",
                borderWidth: "1px",
                borderStyle: "solid",
                outline: "none",
              }}
            />
          </>
        </StandaloneSearchBox>
        <Map
          onMapClick={onMapClick}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
          mapContainerStyle={{
            width: "100%",
            height: "400px",
          }}
        />
      </div>
    </div>
  );
};

export default LocationPicker2;
