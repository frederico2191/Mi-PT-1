import * as React from "react";
import "../../../styles/home.css";
import Map from "../Map";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

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

  const getPosition = (point) => {
    const coords = {
      lat: Number(point.lat),
      lng: Number(point.lng),
    };
    return coords;
  };

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
          // icon={{
          //   url: getUrl(givenClass),
          //   scaledSize: new window.google.maps.Size(30, 30),
          // }}
        />
      ))}
      {selectedEvent && (
        <InfoWindowF
          position={getPosition(selectedEvent)}
          onCloseClick={() => setSelectedEvent(null)}
        >
          <div className="p-1">
            <span className="d-flex flex-row align-items-center mb-3">
              <h4 className="align-self-end mb-0">{selectedEvent.name}</h4>
              <span className="mb-0">
                &nbsp; w/ &nbsp;
                <b className="fs-5">{selectedEvent.trainerName}</b>
              </span>
            </span>
            <p className="mb-2">{dayjs(selectedEvent.date).format("lll")}</p>
            <p className="fw-bold mb-2">{selectedEvent.duration}min</p>
            <p>{selectedEvent.address}</p>
            <Link to={`/activity_per_trainer/${selectedEvent.id}`}>
              <button className="btn btn-outline-primary">Book me</button>
            </Link>
          </div>
        </InfoWindowF>
      )}
    </Map>
  );
};

export default HomeLocationPicker;
