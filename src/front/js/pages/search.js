import React, { useContext, useEffect, useState } from "react";
import HomeLocationPicker from "../component/Search/HomeLocationPicker";
import SearchResults from "../component/Search/SearchResults";
import { Context } from "../store/appContext";
import { getDistanceInKm } from "../utilities";
import "./search.css";

const Search = () => {
  const { store, actions } = useContext(Context);

  const [filteredEvents, setFilteredEvents] = useState(filteredEvents);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [searchDistance, setSearchDistance] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredEventId, setHoveredEventId] = useState(null);

  useEffect(() => {
    if (store.token && store.token) {
      actions.getAllTypesActivities();
      actions.getAllClasses();
    }
  }, [store.token, store.user]);

  const handleSearch = () => {
    setSearchPerformed(true);
    let filtered = store.allClasses?.filter((givenClass) => {
      const isInSelectedActivity =
        selectedActivity === "" || givenClass.name === selectedActivity;

      if (!isInSelectedActivity || givenClass.trainee_id) {
        return false;
      }

      if (searchDistance !== "") {
        const distanceInKm = getDistanceInKm(markerPosition, {
          lat: givenClass.lat,
          lng: givenClass.lng,
        });
        return distanceInKm <= parseFloat(searchDistance);
      }

      return true;
    });

    filtered = filtered.map((givenClass) => {
      const distanceInKm = getDistanceInKm(markerPosition, {
        lat: givenClass.lat,
        lng: givenClass.lng,
      });
      // console.log(givenClass, "Given CLASS inside the handle search");
      return { ...givenClass, distanceInKm: distanceInKm.toFixed(2) };
    });

    console.log("filtered", filtered);
    setFilteredEvents(filtered);
    actions.setProcessedResults({ processedResults: filtered });
    // setSelectedActivity("");
    // setSearchDistance("");
  };

  const mapStyle = {
    width: "80%",
    height: "350px",
    maxWidth: "500px",
  };

  return (
    <div className="search-container">
      <HomeLocationPicker
        mapContainerStyle={mapStyle}
        markerPosition={markerPosition}
        setMarkerPosition={setMarkerPosition}
        filteredEvents={filteredEvents}
        setSelectedEvent={setSelectedEvent}
        setHoveredEventId={setHoveredEventId}
        hoveredEventId={hoveredEventId}
        selectedEvent={selectedEvent}
      />
      <div className="my-3">
        <select
          className="form-select search-select"
          aria-label="Default select example"
          value={selectedActivity}
          onChange={(e) => {
            e.persist();
            setSelectedActivity(e.target.value);
          }}
        >
          <option value="">Select Activity Name</option>
          {store.allTypesActivities?.map((x) => {
            return (
              <option key={x.id} value={x.name}>
                {x.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <input
          type="number"
          name="distance"
          className="search-distance"
          value={searchDistance}
          placeholder="Distance(km)"
          onChange={(e) => setSearchDistance(e.target.value)}
          min="1"
        />
      </div>
      <button onClick={handleSearch} className="btn btn-primary">
        Search
      </button>
      <SearchResults
        filteredEvents={filteredEvents}
        searchPerformed={searchPerformed}
      />
    </div>
  );
};

export default Search;
