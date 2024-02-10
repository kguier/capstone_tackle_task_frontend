import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm";
import useAuth from "../../hooks/useAuth";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const EditEventForm = ({ activeEvent }) => {
  const { config } = useAuth();
  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(
        "https://localhost:5001/api/Events/${activeEvent.id}",
        updatedData,
        config
      );
    } catch (error) {
      console.error("Error updating event:", error.response.data);
    }
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    handleUpdate,
    activeEvent
  );
  return (
    <Form>
      <Form.Group className="edit-event" controlId="formBasicTitle">
        <Form.Label>Event Title</Form.Label>
        <Form.Control type="text" placeholder="Enter New Event Title" />
      </Form.Group>

      <Form.Group className="edit-event" controlId="formBasicDateTime">
        <Form.Label>Date/Time</Form.Label>
        <Form.Control type="dateTime" placeholder="Enter New Date and Time" />
      </Form.Group>
    </Form>
  );
};

export default EditEventForm;
