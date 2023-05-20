import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { FiMapPin } from "react-icons/fi";
import Map from "./Map";
import { StandaloneSearchBox, useLoadScript } from "@react-google-maps/api";
import "./LocationPicker2.css";

const libraries = ["places"];

const LocationPicker2 = ({ setLocation, location }) => {
  const { store, actions } = useContext(Context);
  const [showMap, setShowMap] = useState(false);
  const [searchBox, setSearchBox] = useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 40.7128,
    lng: -74.006,
  });

  useEffect(() => {
    console.log("hello geolocation");
    console.log("navigator", navigator);
    console.log("navigator.geolocation", navigator.geolocation);
    if (navigator.geolocation) {
      console.log("here inside");
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("position?", position);
        const marker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("marker?", marker);
        setMarkerPosition(marker);
        console.log("I am current position marker position inside map", marker);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [window.google, navigator.geolocation, store.processedResults]);

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  // const { isLoaded, loadError } = useLoadScript({
  //   // googleMapsApiKey: "AIzaSyBh1vaimejxuAf2sgR69gQsq0MxWMOrOrc",
  //   googleMapsApiKey: "AIzaSyDDZ4KCljuX_ugUKoGDSsdiswCVE0k_UY8",
  //   libraries,
  // });

  const onMapClick = (e) => {
    // setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
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
      <div onClick={() => setShowMap(!showMap)}>
        {showMap ? "Hide Map" : <FiMapPin />}
      </div>

      {/* {showMap && ( */}
      {/* {isLoaded && ( */}
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
        <Map
          onMapClick={onMapClick}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default LocationPicker2;