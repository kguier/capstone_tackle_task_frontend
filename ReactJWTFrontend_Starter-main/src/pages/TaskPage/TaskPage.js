import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import TaskListForm from "../../components/TaskListForm/TaskListForm";
import "./TaskPage.css";

const TaskPage = () => {
  const { config, token } = useAuth();
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
        config
      );
    } catch (error) {}
  }
  useEffect(() => {
    fetchTaskLists();
  }, [token]);

  const fetchTaskLists = async () => {
    try {
      let response = await axios.get(
        "https://localhost:5001/api/TaskLists",
        config
      );
      setTaskLists(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <div className="task-page-container">
        <div className="add-list-container">
          <h3>Add a List:</h3>
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
        <div className="add-task-container">
          <h3>Add Task to List:</h3>
          <TaskListForm />
        </div>
      </div>
      <div className="task-list">
        {taskLists &&
          taskLists.map((taskList) => (
            <p key={taskList.id}>
              {taskList.id} {taskList.name} {}
            </p>
          ))}
      </div>
    </>
  );
};

export default TaskPage;
