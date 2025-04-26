import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import useApiContext from "../contexts/ApiContext";
import { toast } from "react-toastify";

const MenhelyiMacskaModositasModal = ({ show, onClose, macska }) => {
  const { updateShelteredCat, updateReportPhoto } = useApiContext();
  const [photoFile, setPhotoFile] = useState(null);
  const [formData, setFormData] = useState({
    kennel_number: macska.kennel_number || "",
    medical_record: macska.medical_record || "",
    chip_number: macska.chip_number || "",
    breed: macska.breed || "",
    status: macska.status || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    if (photoFile && photoFile.size > 2 * 1024 * 1024) {
      toast.error("A kép túl nagy! Maximum 2 MB engedélyezett.");
      setLoading(false);
      return;
    }
  
    try {
      await updateShelteredCat(macska.cat_id, formData);  
      if (photoFile) {
         await updateReportPhoto(macska.report, photoFile);
      }
  
      toast.success("A macska adatai sikeresen frissítve!");
      onClose();
    } catch (err) {
      console.error("Hiba a módosítás során:", err);
      toast.error("Nem sikerült a módosítás. Próbáld újra!");
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
            <Form.Label>Kép módosítása</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kennelszám</Form.Label>
            <Form.Control
              name="kennel_number"
              value={formData.kennel_number}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kórlap</Form.Label>
            <Form.Control
              name="medical_record"
              value={formData.medical_record}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Chip szám</Form.Label>
            <Form.Control
              name="chip_number"
              value={formData.chip_number}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fajta</Form.Label>
            <Form.Control
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Státusz</Form.Label>
            <Form.Select
              name="s_status"
              value={formData.s_status}
              onChange={handleChange}
            >
              <option value="">-- Válassz státuszt --</option>
              <option value="a">Aktív</option>
              <option value="e">Elhunyt</option>
            </Form.Select>
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
