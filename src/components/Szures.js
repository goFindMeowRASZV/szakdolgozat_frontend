import React, { useState } from "react";
import { Form, Button, Col, Row, Modal } from "react-bootstrap";
import useAuthContext from "../model/contexts/AuthContext";
import MacsCard from "./MacsCard";

const Szures = ({ type }) => {
  const { getReportsFilter, getShelteredReportsFilter, reportsLISTA, menhelyLISTA } = useAuthContext();
  const [formData, setFormData] = useState({
    color: [],
    pattern: [],
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal megjelenítésének állapota

  //Input mező változáskezelés (szín, minta, dátum)
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? [...prev[name], value] : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Szűrési API hívás
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const filters = {
      color: formData.color.length > 0 ? formData.color.join(",") : "*", 
      pattern: formData.pattern.length > 0 ? formData.pattern.join(",") : "*", 
      date1: formData.startDate || "2015-01-01",
      date2: formData.endDate || new Date().toISOString().split("T")[0],
    };

    let data;
    if (type === "reports") {
      data = await getReportsFilter(filters); 
    } else {
      data = await getShelteredReportsFilter(filters); 
    }

    console.log("Backend válasz:", data); // Backend válaszának naplózása

    setResults(data);
    setLoading(false);
    setShowModal(false);
  };

  // Modal nyitása és zárása
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <Button variant="dark" onClick={handleShow}>
        Szűrés a cicák között
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{type === "reports" ? "Bejelentések szűrése" : "Menhelyi macskák szűrése"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
              <Form.Group controlId="color">
              <Form.Label>Szín</Form.Label>
              <Form.Check
                type="checkbox"
                label="Fehér"
                value="feher"
                checked={formData.color.includes('feher')}
                onChange={handleChange}
                name="color"
              />
              <Form.Check
                type="checkbox"
                label="Fekete"
                value="fekete"
                checked={formData.color.includes('fekete')}
                onChange={handleChange}
                name="color"
              />
              <Form.Check
                type="checkbox"
                label="Barna"
                value="barna"
                checked={formData.color.includes('barna')}
                onChange={handleChange}
                name="color"
              />
              <Form.Check
                type="checkbox"
                label="Vörös"
                value="voros"
                checked={formData.color.includes('voros')}
                onChange={handleChange}
                name="color"
              />
              <Form.Check
                type="checkbox"
                label="Bézs"
                value="bezs"
                checked={formData.color.includes('bezs')}
                onChange={handleChange}
                name="color"
              />
              <Form.Check
                type="checkbox"
                label="Szürke"
                value="szurke"
                checked={formData.color.includes('szurke')}
                onChange={handleChange}
                name="color"
              />
              <Form.Check
                type="checkbox"
                label="Egyéb"
                value="egyeb"
                checked={formData.color.includes('egyeb')}
                onChange={handleChange}
                name="color"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="pattern">
              <Form.Label>Minta</Form.Label>
              <Form.Check
                type="checkbox"
                label="Cirmos"
                value="cirmos"
                checked={formData.pattern.includes('cirmos')}
                onChange={handleChange}
                name="pattern"
              />
              <Form.Check
                type="checkbox"
                label="Foltos"
                value="foltos"
                checked={formData.pattern.includes('foltos')}
                onChange={handleChange}
                name="pattern"
              />
              <Form.Check
                type="checkbox"
                label="Egyszínű"
                value="egyszinu"
                checked={formData.pattern.includes('egyszinu')}
                onChange={handleChange}
                name="pattern"
              />
              <Form.Check
                type="checkbox"
                label="Teknőctarka"
                value="teknoctarka"
                checked={formData.pattern.includes('teknoctarka')}
                onChange={handleChange}
                name="pattern"
              />
              <Form.Check
                type="checkbox"
                label="Kopasz"
                value="kopasz"
                checked={formData.pattern.includes('kopasz')}
                onChange={handleChange}
                name="pattern"
              />
              <Form.Check
                type="checkbox"
                label="Fóka"
                value="foka"
                checked={formData.pattern.includes('foka')}
                onChange={handleChange}
                name="pattern"
              />
              <Form.Check
                type="checkbox"
                label="Kalikó"
                value="kaliko"
                checked={formData.pattern.includes('kaliko')}
                onChange={handleChange}
                name="pattern"
              />
            </Form.Group>
          </Col>

              <Col md={6}>
                <Form.Group controlId="startDate">
                  <Form.Label>Mettől</Form.Label>
                  <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="endDate">
                  <Form.Label>Meddig</Form.Label>
                  <br></br>
                  <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="dark" type="submit">Keresés</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <p>Betöltés...</p>
      ) : results && results.length > 0 ? (
        <div>
          <h3>Eredmények:</h3>
          <div className="card-deck">
            {results.map((macska) => (
              <MacsCard key={macska.id} adat={macska} />
            ))}
          </div>
        </div>
      ) : (
        <p style={{ color: "black" }}>Nincs találat.</p>
      )}
    </div>
  );
};

export default Szures;
