import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        // Other FullCalendar props
      />
    </div>
  );
};
export default Calendar;
