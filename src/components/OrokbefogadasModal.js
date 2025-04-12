import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import useApiContext from "../contexts/ApiContext";

const OrokbefogadasModal = ({ show, onClose, macska, user }) => {
  const { submitAdoptionRequest } = useApiContext();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const isValid = message.trim().length >= 150;

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!isValid || isSending) return;
  
    setIsSending(true);
    try {
      const data = {
        message,
        report_report_id: macska.report_id,
        report_color: macska.color,
        report_pattern: macska.pattern,
        report_photo: macska.photo,
        user_id: user.id,
        user_email: user.email,
        user_name: user.name,
      };
  
      await submitAdoptionRequest(data);
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Hiba az örökbefogadási kérelem elküldésekor:", error);
    } finally {
      setIsSending(false);
    }
  };
  

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Örökbefogadási jelentkezés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Bemutatkozás</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Írj pár mondatot magadról, például: miért szeretnéd örökbefogadni a cicát, van-e más állatod, milyen környezetbe kerülne stb."
            value={message}
            onChange={handleChange}
          />
          <small className="text-muted">
            Legalább 150 karakter. ({message.trim().length}/150)
          </small>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleSend} disabled={!isValid || isSending}>
          {isSending ? <Spinner size="sm" animation="border" /> : "Küldés"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrokbefogadasModal;
