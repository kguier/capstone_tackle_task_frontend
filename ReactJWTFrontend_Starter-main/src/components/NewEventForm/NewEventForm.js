import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import "./NewEventForm.css";

const NewEventForm = ({ onNewEvent }) => {
  const { config } = useAuth();
  const [events, setEvents] = useState([]);

  const initialValues = {
    title: "",
    dateTime: "",
    description: "",
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    postNewEvent,
    initialValues
  );

  async function postNewEvent() {
    try {
      let response = await axios.post(
        "https://localhost:5001/api/Events",
        formData,
        config
      );
      onNewEvent();

      reset();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // useEffect(() => {}, [token]);

  return (
    <>
      <div className="event-container">
        <form className="eventform" onSubmit={handleSubmit}>
          <label className="label-title">
            Title:{""}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <label className="label-datetime">
            Date/Time:{""}
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleInputChange}
            />
          </label>
          <label className="label-description">
            Description:{""}
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Add Event</button>
        </form>
      </div>
    </>
  );
};

export default NewEventForm;
