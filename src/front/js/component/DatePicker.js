import {
  MobileDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import dayjs from "dayjs";

const DatePicker = ({ eventDate, setEventDate }) => {
  const handleChange = (newValue) => {
    setEventDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        id="date_picker"
        className="w-100 mb-4"
        value={eventDate && dayjs(eventDate)}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
