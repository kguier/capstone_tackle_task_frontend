import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Form } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const EditEventForm = ({ activeEvent, onUpdate }) => {
  const { config } = useAuth();
  const [updatedTitle, setUpdatedTitle] = useState(activeEvent?.title || "");
  const [updatedDateTime, setUpdatedDateTime] = useState(
    activeEvent?.dateTime || ""
  );
  const [updatedDescription, setUpdatedDescription] = useState(
    activeEvent?.description || ""
  );

  const handleUpdate = async () => {
    console.log("Handle Update function called");
    try {
      const updatedData = {
        id: activeEvent.id,
        title: updatedTitle,
        dateTime: updatedDateTime,
        description: updatedDescription,
      };

      const response = await axios.put(
        `https://localhost:5001/api/Events/${activeEvent.id}`,
        updatedData,
        config
      );

      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating event:", error.response.data);
    }
  };

  return (
    <Form>
      <Form.Group className="edit-event" controlId="formBasicTitle">
        <Form.Label>Event Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter New Event Title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="edit-event" controlId="formBasicDateTime">
        <Form.Label>Date/Time</Form.Label>
        <Form.Control
          type="dateTime-local"
          placeholder="Enter New Date and Time"
          value={updatedDateTime}
          onChange={(e) => setUpdatedDateTime(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="edit-description" controlId="formBasicDescription">
        <Form.Label>Event Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter New Event Description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleUpdate}>
        Save Changes
      </Button>
    </Form>
  );
};

export default EditEventForm;
