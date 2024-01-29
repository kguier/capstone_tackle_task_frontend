import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import NewEventForm from "../NewEventForm/NewEventForm";

const Calendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([
    { title: "Event 1", date: "2024-01-28" },
    { title: "Event 2", date: "2024-01-29" },
  ]);

  const addEventToCalendar = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };
  console.log("Updated Events:", events);
  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
      <NewEventForm addEventToCalendar={addEventToCalendar} />
    </div>
  );
};
export default Calendar;
