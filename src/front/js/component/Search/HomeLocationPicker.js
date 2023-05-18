import * as React from "react";
import "../../../styles/home.css";
import Map from "../Map";
import { MarkerF, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";

const HomeLocationPicker = ({
  mapContainerStyle,
  markerPosition,
  setMarkerPosition,
  filteredEvents,
  setSelectedEvent,
  setHoveredEventId,
  hoveredEventId,
  selectedEvent,
}) => {
  const getUrl = (givenClass) =>
    hoveredEventId === givenClass.id
      ? "https://maps.google.com/mapfiles/kml/shapes/info.png"
      : "https://maps.google.com/mapfiles/kml/shapes/target.png";

  const getPosition = (point) => ({
    lat: parseInt(point.lat),
    lng: parseInt(point.lng),
  });

  return (
    <Map
      mapContainerStyle={mapContainerStyle}
      markerPosition={markerPosition}
      setMarkerPosition={setMarkerPosition}
    >
      {filteredEvents?.map((givenClass) => (
        <MarkerF
          key={givenClass.id}
          position={getPosition(givenClass)}
          onClick={() => setSelectedEvent(givenClass)}
          onMouseOver={() => setHoveredEventId(givenClass.id)}
          onMouseOut={() => setHoveredEventId(null)}
          icon={{
            url: getUrl(givenClass),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      ))}
      {selectedEvent && (
        <InfoWindow
          position={getPosition(selectedEvent)}
          onCloseClick={() => setSelectedEvent(null)}
        >
          <div>
            <h4>{selectedEvent.name}</h4>
            <p>
              {selectedEvent.date} - {selectedEvent.hour}
            </p>
            <Link to={`/activity_per_trainer/id`}>
              <button className="btn btn-outline-primary">Book me</button>
            </Link>
          </div>
        </InfoWindow>
      )}
    </Map>
  );
};

export default HomeLocationPicker;
