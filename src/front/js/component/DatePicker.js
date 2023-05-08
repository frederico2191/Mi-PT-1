import {
  MobileDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import dayjs from "dayjs";

const DatePicker = ({ eventDate, setEventDate }) => {
  //   const defaultValue = Date.now();
  //   const [date, setDate] = useState(null);

  const handleChange = (newValue) => {
    console.log(" METHODS AVAILABLE IN PROTOTYP 777777", newValue);
    setEventDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        label="Basic date picker"
        defaultValue={eventDate && dayjs(eventDate)}
        value={eventDate}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
