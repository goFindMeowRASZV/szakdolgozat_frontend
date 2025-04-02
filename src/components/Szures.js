import React, { useState } from "react";
import { Form, Button, Col, Row, Modal, ListGroup } from "react-bootstrap";
import useApiContext from "../contexts/ApiContext";
import MacsCard from "./MacsCard";
import { useNavigate } from "react-router-dom";

const Szures = ({ type }) => {
  const { getReportsFilter, getShelteredReportsFilter, szuresLISTA, setAktualisMacska } = useApiContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    status: "",
    color: "",
    pattern: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filters = {
      status: formData.status || "*",
      color: formData.color || "*",
      pattern: formData.pattern || "*",
    };

    if (type === "reports") {
      await getReportsFilter(filters);
    } else {
      await getShelteredReportsFilter(filters);
    }

    setLoading(false);
    setShowModal(false);
  };

  const handleCardClick = (elem) => {
    navigate(`/MacskaProfil`);
    setAktualisMacska(elem);
  };

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
                {type === "reports" && (
                  <Form.Group>
                    <Form.Label>Bejelentés állapota</Form.Label>
                    {["t", "k", "l"].map((val) => (
                      <Form.Check
                        key={`status-${val}`}
                        id={`status-${val}`}
                        type="radio"
                        label={
                          val === "t" ? "Talált" : val === "k" ? "Keresett" : "Látott"
                        }
                        value={val}
                        checked={formData.status === val}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        name="status"
                      />
                    ))}
                  </Form.Group>
                )}

                <Form.Group>
                  <Form.Label>Cica színe</Form.Label>
                  {[
                    "feher", "fekete", "barna", "voros", "bezs", "szurke",
                    "feketefeher", "feketefehervoros", "feketevoros",
                    "vorosfeher", "szurkefeher", "barnafeher", "barnabezs", "egyeb"
                  ].map((val) => (
                    <Form.Check
                      key={`color-${val}`}
                      id={`color-${val}`}
                      type="radio"
                      label={val.replace(/-/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")}
                      value={val}
                      checked={formData.color === val}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      name="color"
                    />
                  ))}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Cica mintája</Form.Label>
                  {["cirmos", "foltos", "egyszinu", "teknoctarka", "kopasz", "foka", "kaliko"].map((val) => (
                    <Form.Check
                      key={`pattern-${val}`}
                      id={`pattern-${val}`}
                      type="radio"
                      label={val.charAt(0).toUpperCase() + val.slice(1)}
                      value={val}
                      checked={formData.pattern === val}
                      onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                      name="pattern"
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>

            <Button variant="dark" type="submit">
              Keresés
            </Button>
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
      ) : szuresLISTA && szuresLISTA.length > 0 ? (
        <div>
          <h3>Eredmények:</h3>
          <div className="card-deck">
            {szuresLISTA.map((elem, index) => (
              <div key={index} onClick={() => handleCardClick(elem)} style={{ cursor: "pointer" }}>
                <MacsCard adat={elem} index={elem.id} />
              </div>
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
