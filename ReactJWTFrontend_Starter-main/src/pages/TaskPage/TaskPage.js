import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

const TaskPage = () => {
  const [user, token] = useAuth();
  const [taskLists, setTaskLists] = useState([]);

  const initialValues = {
    name: "",
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    postNewList,
    initialValues
  );

  async function postNewList() {
    try {
      let response = await axios.post(
        "https://localhost:5001/api/TaskLists",
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
    fetchTaskLists();
  }, [token]);

  const fetchTaskLists = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/TaskLists", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTaskLists(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <p>Your Tasks</p>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            List Name:{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <button>Add New List</button>
        </form>
      </div>
      <div>
        {taskLists &&
          taskLists.map((taskList) => <p key={taskList.id}>{taskList.name}</p>)}
      </div>
    </>
  );
};

export default TaskPage;
