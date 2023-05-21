import React, { useContext, useEffect, useState } from "react";
import HomeLocationPicker from "../component/Search/HomeLocationPicker";
import SearchResults from "../component/Search/SearchResults";
import { Context } from "../store/appContext";
import { getDistanceInKm } from "../utilities";
import "./search.css";
import SearchCity from "../component/SearchCity";

const Search = () => {
  const { store, actions } = useContext(Context);

  const [filteredEvents, setFilteredEvents] = useState(filteredEvents);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [searchDistance, setSearchDistance] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    (async () => {
      if (store.token && store.token) {
        await actions.getAllTypesActivities();
        await actions.getAllClasses();
      }
    })();
  }, [store.token, store.user]);

  const handleDistance = (e) => {
    setSearchDistance(e.target.value);
  };

  const handleSearch = async () => {
    setSearchPerformed(true);
    let foundCity;
    let distance = searchDistance;

    if (store.searchedCityName) {
      const result = await actions.searchCity(store.searchedCityName);
      if (!result?.length) setCity();
      foundCity = result[0];
      actions.setSearchedCityObject(foundCity);
      setCity(foundCity);
    }
    if (foundCity && searchDistance === "") {
      distance = 20;
      setSearchDistance(20);
    }

    let filtered = store.allClasses?.filter((givenClass) => {
      const isInSelectedActivity =
        selectedActivity === "" || givenClass.name === selectedActivity;

      if (!isInSelectedActivity || givenClass.trainee_id) {
        return false;
      }

      if (distance) {
        const distanceInKm = getDistanceInKm(foundCity || markerPosition, {
          lat: givenClass.lat || givenClass.latitude,
          lng: givenClass.lng || givenClass.longitude,
        });
        return distanceInKm <= parseFloat(distance);
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

    setFilteredEvents(filtered);
    actions.setProcessedResults({ processedResults: filtered });
    // setSelectedActivity("");
    // setSearchDistance("");
  };

  const handleType = (event) => {
    event.preventDefault();
    actions.setSearchedCityName(event.target.value);
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
          className="search-input"
          placeholder="Distance(km)"
          onChange={handleDistance}
          min="1"
        />
      </div>
      <input
        type="text"
        name="city"
        className="search-input"
        placeholder="City"
        id="city"
        onChange={handleType}
      />
      <button onClick={handleSearch} className="btn btn-primary mb-5">
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
