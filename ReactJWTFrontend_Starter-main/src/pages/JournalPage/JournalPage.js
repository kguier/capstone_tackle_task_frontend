import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import "./JournalPage.css";

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
      <div className="journal-container">
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
      <div className="entries">
        {entries &&
          entries.map((entry) => (
            <p key={entry.id} className="entry-item">
              <li className="journal-list-item">{entry.title}</li>
              <li className="journal-list-item">{entry.entryContent}</li>
              <li className="journal-list-item">{entry.timestamp}</li>
            </p>
          ))}
      </div>
    </>
  );
};

export default JournalPage;
