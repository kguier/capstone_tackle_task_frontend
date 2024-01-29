import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

const NewEventForm = ({ addEventToCalendar }) => {
  const [user, token] = useAuth();
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
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      addEventToCalendar(response.data);

      reset();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {}, [token]);

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Title:{""}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date/Time:{""}
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleInputChange}
            />
          </label>
          <label>
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
