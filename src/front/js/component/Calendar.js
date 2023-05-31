import React from "react";

const Calendar = ({ eventDate, setEventDate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDate({ ...eventDate, [name]: value });
  };

  return (
    <>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        name="date"
        value={eventDate.date}
        onChange={handleChange}
      />
      <label htmlFor="hour">Hour:</label>
      <select name="hour" value={eventDate.hour} onChange={handleChange}>
        <option value="">Select an hour</option>
        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
          <option key={hour} value={hour}>
            {hour.toString().padStart(2, "0")}
          </option>
        ))}
      </select>
      <label htmlFor="minutes">Minutes:</label>
      <select name="minutes" value={eventDate.minutes} onChange={handleChange}>
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
