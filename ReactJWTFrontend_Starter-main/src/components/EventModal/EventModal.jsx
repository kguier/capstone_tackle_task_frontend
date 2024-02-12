import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditEventForm from "../EditEventForm/EditEventForm";

const EventModal = ({ activeEvent, onClose, handleUpdate }) => {
  const show = Boolean(activeEvent);
  console.log(activeEvent);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditEventForm activeEvent={activeEvent} onUpdate={handleUpdate} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
