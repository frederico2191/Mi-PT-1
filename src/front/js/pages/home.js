import { useContext, useEffect, useState } from "react";
import * as React from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Card from "../component/Card";
import CardClass3 from "../component/CardClass3";
import EventModal from "../component/EventModal";
import Map from "../component/Map";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";

// useEffect(() => {
//   const fetchEvents = async () => {
//     const snapshot = await db.collection('events').get();
//     const fetchedEvents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setEvents(fetchedEvents);
//   };

//   fetchEvents();
// }, []);

// const handleApply = async (eventId) => {
//   // Replace with the trainee's actual ID or details
//   const traineeId = 'trainee1';

//   // Update the event's status to 'booked'
//   await db.collection('events').doc(eventId).update({
//     status: 'booked',
//     traineeId: traineeId,
//   });

//   // Remove the booked event from the filteredEvents list
//   setFilteredEvents(filteredEvents.filter((event) => event.id !== eventId));

//   alert('Booked the event successfully');
// };

// function to calculate the distance from the users location

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const user = store.user;
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [searchDistance, setSearchDistance] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredEventId, setHoveredEventId] = useState(null);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getMessage();
    actions.getAllTypesActivities();

    actions.getAllClasses();
  }, [store.token, user]);

  useEffect(() => {
    console.log("FILTERED EVENTS", filteredEvents);
  }, [filteredEvents]);

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

  const createEvent = () => {
    setShowModal(!showModal);
  };

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

    setFilteredEvents(filtered);
    // setSelectedActivity("");
    // setSearchDistance("");
  };
  const getDistanceInKm = (pos1, pos2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (pos2.lat - pos1.lat) * (Math.PI / 180);
    const dLng = (pos2.lng - pos1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pos1.lat * (Math.PI / 180)) *
        Math.cos(pos2.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  return (
    <div>
      <div className="text-center mt-5">
        <h1>Welcome to Mi PT</h1>

        <div className="alert alert-info">
          {store.message ||
            "Loading message from the backend (make sure your python backend is running)..."}
        </div>
      </div>
      <EventModal />
      <div>
        <div>
          {store.allTypesActivities?.map((x) => {
            const activityClasses = store.allClasses?.filter(
              (givenClass) => givenClass.name == x.name
            );
            console.log(activityClasses, "77777777777777########");
            return (
              <>
                {activityClasses.length > 0 ? (
                  <>
                    <h1 className="scrollerTitles">{x.name}</h1>
                    <div className="list-group horizontal-scroller">
                      {activityClasses?.map((givenClass) => {
                        console.log("givenCLASSSSS", givenClass);
                        return (
                          <CardClass3
                            key={givenClass.id}
                            givenClass={givenClass}
                          ></CardClass3>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Trainee Page</h1>
        {/* <div>
          <label htmlFor="activity">Activity:</label>
          <select
            name="activity"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
          >
            <option value="">Select an activity</option>
            {activities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </div> */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Activity
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={selectedActivity}
            onChange={(e) => {
              e.persist();
              console.log("EVENT", e.target.value);
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
          <label htmlFor="distance">Distance (km):</label>
          <input
            type="number"
            name="distance"
            value={searchDistance}
            onChange={(e) => setSearchDistance(e.target.value)}
            min="1"
          />
        </div>
        <button onClick={handleSearch}>Search</button>
        <Map markerPosition={markerPosition}>
          {filteredEvents.map((givenClass) => (
            <Marker
              key={givenClass.id}
              position={{
                lat: parseInt(givenClass.lat),
                lng: parseInt(givenClass.lng),
              }}
              onClick={() => setSelectedEvent(givenClass)}
              onMouseOver={() => setHoveredEventId(givenClass.id)}
              onMouseOut={() => setHoveredEventId(null)}
              icon={{
                url:
                  hoveredEventId === givenClass.id
                    ? "https://maps.google.com/mapfiles/kml/shapes/info.png"
                    : "https://maps.google.com/mapfiles/kml/shapes/target.png",
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
          {selectedEvent && (
            <InfoWindow
              position={{
                lat: parseInt(selectedEvent.lat),
                lng: parseInt(selectedEvent.lng),
              }}
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
                {/* <Link to={`/trainer/${item.id}`}>
                  <button
                    className="btn btn-outline-primary"
                    // onClick={handleProfileClick}
                  >
                    Trainer's Profile
                  </button>
                </Link>
              </div>
            ) : (
              <Link to={`/register`}>
                <button className="btn btn-outline-primary">
                  Check it out
                </button>
              </Link> */}
              </div>
            </InfoWindow>
          )}
        </Map>
        <div>
          {filteredEvents.map((givenClass) => {
            console.log("givenCLASSSSS", givenClass);
            return (
              <>
                <h1 className="scrollerTitles">{givenClass.name}</h1>
                <CardClass2
                  key={givenClass.id}
                  givenClass={givenClass}
                ></CardClass2>
              </>
            );
          })}
        </div>
        {filteredEvents.length === 0 && searchPerformed && (
          <p>
            Unfortunately, your search did not find any events. How about trying
            a new activity?
          </p>
        )}

        {/*
                  <>
                    <h1 className="scrollerTitles">{x.name}</h1>
                    <div className="list-group horizontal-scroller">
                      {activityClasses?.map((givenClass) => {
                        console.log("givenCLASSSSS", givenClass);
                        return (
                          <CardClass2
                            key={givenClass.id}
                            givenClass={givenClass}
                          ></CardClass2>
                        );
                      })}
                    </div>
                  </>
                ) : null} */}
        {/* {filteredEvents.map((event) => (
            <li
              key={event.id}
              onMouseOver={() => setHoveredEventId(event.id)}
              onMouseOut={() => setHoveredEventId(null)}
              style={{
                backgroundColor:
                  hoveredEventId === event.id ? "lightgray" : "white",
              }}
            >
              {event.description} - {event.date} - {event.hour} - {event.price}{" "}
              {/* - {event.distanceInKm} km */}
        {/* <button onClick={() => handleApply(event.id)}>Apply</button>
            </li>
          ))}
        </ul>
        {filteredEvents.length === 0 && searchPerformed && (
          <p>
            Unfortunately, your search did not find any events. How about trying
            a new activity?
          </p>
        )} */}
      </div>
    </div>
  );
};
