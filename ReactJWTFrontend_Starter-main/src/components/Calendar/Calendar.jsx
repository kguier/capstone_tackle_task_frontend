import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import NewEventForm from "../NewEventForm/NewEventForm";
import "./Calendar.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Calendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  const { config } = useAuth();

  async function fetchEvents() {
    try {
      const response = await axios.get(
        "https://localhost:5001/api/Events",
        config
      );
      setEvents(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const calendarEvents = events.map((event) => ({
    title: event.title,
    date: event.dateTime,
  }));

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
      />
      <NewEventForm onNewEvent={fetchEvents} />
    </div>
  );
};
export default Calendar;
