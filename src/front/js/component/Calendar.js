import React from "react";

const Calendar = ({ eventData, setEventData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  return (
    <>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleChange}
        // required
      />

      <label htmlFor="hour">Hour:</label>
      <select
        name="hour"
        value={eventData.hour}
        onChange={handleChange}
        // required
      >
        <option value="">Select an hour</option>
        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
          <option key={hour} value={hour}>
            {hour.toString().padStart(2, "0")}
          </option>
        ))}
      </select>

      <label htmlFor="minutes">Minutes:</label>
      <select name="minutes" value={eventData.minutes} onChange={handleChange}>
        <option value="">Select minutes</option>
        {["00", "15", "30", "45"].map((minutes) => (
          <option key={minutes} value={minutes}>
            {minutes}
          </option>
        ))}
      </select>
    </>
  );
};

export default Calendar;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData({ ...eventData, [name]: value });
//   };

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('/api/events');
//         setEvents(response.data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get('/api/applications');
//         setApplications(response.data);
//       } catch (error) {
//         console.error('Error fetching applications:', error);
//       }
//     };

//     fetchApplications();
//   }, []);

//   const updateApplicationStatus = async (applicationId, status) => {
//     try {
//       await axios.patch(`/api/applications/${applicationId}`, { status });
//     } catch (error) {
//       console.error('Error updating application status:', error);
//     }
//   };

//   const deleteEvent = async (eventId) => {
//     try {
//       await axios.delete(`/api/events/${eventId}`);
//       console.log('Event successfully deleted!');
//       const updatedEvents = events.filter((e) => e.id !== eventId);
//       setEvents(updatedEvents);
//     } catch (error) {
//       console.error('Error removing event:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Coach Page</h1>
//       <button onClick={() => setShowModal(true)}>Create Event</button>

//       {showModal && (
//         <div className="modal">
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="activity">Activity:</label>
//             <select name="activity" value={eventData.activity} onChange={handleChange} required>
//               <option value="">Select an activity</option>
//               {activities.map((activity) => (
//                 <option key={activity} value={activity}>
//                   {activity}
//                 </option>
//               ))}
//             </select>

//             <label htmlFor="date">Date:</label>
//             <input type="date" name="date" value={eventData.date} onChange={handleChange} required />

//             <label htmlFor="hour">Hour:</label>
//             <select name="hour" value={eventData.hour} onChange={handleChange} required>
//               <option value="">Select an hour</option>
//               {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
//                 <option key={hour} value={hour}>
//                   {hour.toString().padStart(2, '0')}
//                 </option>
//               ))}
//             </select>

//             <label htmlFor="minutes">Minutes:</label>
//             <select name="minutes" value={eventData.minutes} onChange={handleChange} required>
//               <option value="">Select minutes</option>
//               {['00', '15', '30', '45'].map((minutes) => (
//                 <option key={minutes} value={minutes}>
//                   {minutes}
//                 </option>
//               ))}
//             </select>

//             <label htmlFor="city">City:</label>
//             <select name="city" value={eventData.city} onChange={handleChange} required>
//               <option value="">Select a city</option>
//               {cities.map((city) => (
//                 <option key={city} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>

//             <button type="submit">Submit</button>
//             <button type="button" onClick={() => setShowModal(false)}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//       <ul>
//         {events.map((event) => (
//           <li key={event.id}>
//             {event.activity} - {event.date} - {event.time} - {event.city}{' '}
//             <button
//               onClick={() => {
//                 deleteEvent(event.id);
//               }}
//             >
//               Cancel
//             </button>
//             <ul>
//               {applications
//                 .filter((app) => app.eventId === event.id)
//                 .map((app) => (
//                   <li key={app.id}>
//                     {app.traineeName} applied for {event.activity}
//                     <button onClick={() => updateApplicationStatus(app.id, 'accepted')}>Accept</button>
//                     <button onClick={() => updateApplicationStatus(app.id, 'rejected')}>Reject</button>
//                   </li>
//                 ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CoachPage;
