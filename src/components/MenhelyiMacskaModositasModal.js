import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import useApiContext from "../contexts/ApiContext";

const MenhelyiMacskaModositasModal = ({ show, onClose, macska }) => {
  const { updateShelteredCat } = useApiContext();

  const [formData, setFormData] = useState({
    owner: macska.owner || "",
    adoption_date: macska.adoption_date || "",
    kennel_number: macska.kennel_number || "",
    medical_record: macska.medical_record || "",
    chip_number: macska.chip_number || "",
    breed: macska.breed || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateShelteredCat(macska.cat_id, formData);
      onClose();
    } catch (err) {
      console.error("Hiba a módosítás során:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Macska adatainak módosítása</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Gazdi ID</Form.Label>
            <Form.Control name="owner" value={formData.owner} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kikerülés dátuma</Form.Label>
            <Form.Control type="date" name="adoption_date" value={formData.adoption_date} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kennelszám</Form.Label>
            <Form.Control name="kennel_number" value={formData.kennel_number} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kórlap</Form.Label>
            <Form.Control name="medical_record" value={formData.medical_record} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Chip szám</Form.Label>
            <Form.Control name="chip_number" value={formData.chip_number} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fajta</Form.Label>
            <Form.Control name="breed" value={formData.breed} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Mentés"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MenhelyiMacskaModositasModal;
