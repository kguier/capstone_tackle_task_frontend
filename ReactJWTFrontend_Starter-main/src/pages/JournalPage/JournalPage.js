import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

const JournalPage = () => {
  const [user, token] = useAuth();
  const [entries, setEntries] = useState([]);

  const initialValues = {
    title: "",
    entryContent: "",
    timestamp: "",
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    postNewEntry,
    initialValues
  );

  async function postNewEntry() {
    try {
      let response = await axios.post(
        "https://localhost:5001/api/Entries",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {}
  }
  useEffect(() => {
    fetchEntries();
  }, [token]);

  const fetchEntries = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/Entries", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setEntries(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <p>Your Journal</p>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Title:{" "}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Content:{" "}
            <input
              type="text"
              name="entryContent"
              value={formData.entryContent}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Timestamp:{" "}
            <input
              type="text"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleInputChange}
            />
          </label>
          <button>Add New Entry</button>
        </form>
      </div>
      <div>
        {entries &&
          entries.map((entry) => (
            <p key={entry.id}>
              {entry.title} {entry.entryContent} {entry.timestamp}
            </p>
          ))}
      </div>
    </>
  );
};

export default JournalPage;
