import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";

const TaskListForm = () => {
  const [user, token] = useAuth();
  const [taskItems, setTaskItems] = useState([]);

  const initialValues = {
    content: "",
    isComplete: "",
    taskListId: "",
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    postNewTaskItem,
    initialValues
  );

  async function postNewTaskItem() {
    try {
      let response = await axios.post(
        "https://localhost:5001/api/TaskItems",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchTaskItems();
  }, [token]);

  const fetchTaskItems = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/TaskItems", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTaskItems(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Content:{""}
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Completed?:
            <input
              type="checkbox"
              name="isComplete"
              checked={formData.isComplete}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Task List Id:{""}
            <input
              type="number"
              name="taskListId"
              value={formData.taskListId}
              onChange={handleInputChange}
            />
          </label>
          <button>Add New Task</button>
        </form>
      </div>
    </>
  );
};

export default TaskListForm;
