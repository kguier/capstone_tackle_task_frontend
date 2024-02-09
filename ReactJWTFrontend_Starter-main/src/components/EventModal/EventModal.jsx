import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const EventModal = ({ activeEvent, onClose }) => {
  const show = Boolean(activeEvent);
  console.log(activeEvent);
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
