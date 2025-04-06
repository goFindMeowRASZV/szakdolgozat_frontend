import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import useApiContext from "../contexts/ApiContext";

const BejelentesModositasModal = ({ show, onClose, report }) => {
  const { updateReport } = useApiContext();

  const [formData, setFormData] = useState({
    status: "",
    color: "",
    pattern: "",
    other_identifying_marks: "",
    health_status: "",
    chip_number: "",
    circumstances: "",
    number_of_individuals: "",
    disappearance_date: "",
    photo: "",
    activity: 1,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (report) {
      setFormData({
        status: report.status || "",
        color: report.color || "",
        pattern: report.pattern || "",
        other_identifying_marks: report.other_identifying_marks || "",
        health_status: report.health_status || "",
        chip_number: report.chip_number || "",
        circumstances: report.circumstances || "",
        number_of_individuals: report.number_of_individuals || "",
        disappearance_date: report.disappearance_date || "",
        photo: "",
        activity: report.activity ?? 1,
      });
    }
  }, [report]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateReport(report.report_id, formData );
      onClose();
    } catch (err) {
      console.error("Hiba a módosítás során:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Bejelentés adatainak módosítása</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 🔒 Eredeti adatok csak olvasásra */}
        <div className="mb-4 text-sm text-muted">
          <div><strong>Cím:</strong> {report?.address}</div>
          <div><strong>Koordináták:</strong> {report?.lat}, {report?.lon}</div>
          <div><strong>Bejelentés ID:</strong> {report?.report_id}</div>
        </div>

        <Form>
          <Form.Group>
            <Form.Label>Állapot</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange} required>
              <option value="">Válassz...</option>
              <option value="k">Keresett</option>
              <option value="t">Talált</option>
              <option value="l">Látott</option>
              <option value="m">Mentett</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Szín</Form.Label>
            <Form.Select name="color" value={formData.color} onChange={handleChange} required>
              <option value="">Válassz színt</option>
              <option value="feher">Fehér</option>
              <option value="fekete">Fekete</option>
              <option value="barna">Barna</option>
              <option value="voros">Vörös</option>
              <option value="bezs">Bézs</option>
              <option value="szurke">Szürke</option>
              <option value="feketefeher">Fekete - fehér</option>
              <option value="feketefehervoros">Fekete - fehér - vörös</option>
              <option value="feketevoros">Fekete - vörös</option>
              <option value="vorosfeher">Vörös - fehér</option>
              <option value="szurkefeher">Szürke - fehér</option>
              <option value="barnafeher">Barna - fehér</option>
              <option value="barnabezs">Barna - bézs</option>
              <option value="egyeb">Egyéb</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Minta</Form.Label>
            <Form.Select name="pattern" value={formData.pattern} onChange={handleChange} required>
              <option value="">Válassz mintát</option>
              <option value="cirmos">Cirmos</option>
              <option value="foltos">Foltos</option>
              <option value="egyszinu">Egyszínű</option>
              <option value="teknoctarka">Teknőctarka</option>
              <option value="kopasz">Kopasz</option>
              <option value="foka">Fóka</option>
              <option value="kaliko">Kalikó</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Egyéb ismertetőjel</Form.Label>
            <Form.Control name="other_identifying_marks" value={formData.other_identifying_marks} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Egészségi állapot</Form.Label>
            <Form.Control name="health_status" value={formData.health_status} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Chip szám</Form.Label>
            <Form.Control type="number" name="chip_number" value={formData.chip_number} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Körülmények</Form.Label>
            <Form.Control name="circumstances" value={formData.circumstances} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Példányok száma</Form.Label>
            <Form.Control type="number" name="number_of_individuals" value={formData.number_of_individuals} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Esemény dátuma</Form.Label>
            <Form.Control type="date" name="disappearance_date" value={formData.disappearance_date} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Aktivitás</Form.Label>
            <Form.Select name="activity" value={formData.activity} onChange={handleChange}>
              <option value={1}>Aktív</option>
              <option value={0}>Inaktív</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Mégse</Button>
        <Button variant="dark" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Mentés"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BejelentesModositasModal;
