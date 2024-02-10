import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import NewEventForm from "../NewEventForm/NewEventForm";
import "./Calendar.css";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EventModal from "../EventModal/EventModal";

const Calendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [activeEventId, setActiveEventId] = useState(0);

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
    ...event,
    date: event.dateTime,
  }));

  function handleEventClick(eventClickInfo) {
    setActiveEventId(eventClickInfo.event.id);
  }

  const activeEvent = events.find((event) => event.id == activeEventId);

  function handleClose() {
    setActiveEventId(0);
  }

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={handleEventClick}
      />
      <NewEventForm onNewEvent={fetchEvents} />
      <EventModal activeEvent={activeEvent} onClose={handleClose} />
    </div>
  );
};
export default Calendar;
