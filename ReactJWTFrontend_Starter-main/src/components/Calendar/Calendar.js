import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([
    { title: "Event 1", date: "2024-01-28" },
    { title: "Event 2", date: "2024-01-29" },
  ]);

  const addEvent = () => {
    const newEvent = () => {
      const newEvent = { title: "New Event", date: "2024-01-30" };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    };
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
      <button onClick={addEvent}>Add Event</button>
    </div>
  );
};
export default Calendar;
