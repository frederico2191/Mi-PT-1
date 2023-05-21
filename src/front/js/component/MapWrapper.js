import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const MapWrapper = ({ children, setMarkerPosition }) => {
  const { store, actions } = useContext(Context);

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
  return children;
};

export default MapWrapper;
