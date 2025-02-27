import React, { useState } from "react";
import { Form, Button, Col, Row, Modal, Spinner } from "react-bootstrap";
import useAuthContext from "../model/contexts/AuthContext";
import MacsCard from "./MacsCard";

const Szures = ({ type }) => {
  const { getReportsFilter, getShelteredReportsFilter, szuresLISTA, setSzuresLista } =
    useAuthContext();
  const [formData, setFormData] = useState({
    status: "",
    color: "",
    pattern: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      color: [value], // Csak az aktuális érték marad benne a tömbben
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const filters = {
      status: formData.status || "*",
      color: formData.color || "*",
      pattern: formData.pattern || "*",
    };

    let data;
    if (type === "reports") {
      data = await getReportsFilter(filters);
    } else {
      data = await getShelteredReportsFilter(filters);
    }

    setSzuresLista(data);
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
          <Modal.Title>
            {type === "reports"
              ? "Bejelentések szűrése"
              : "Menhelyi macskák szűrése"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="status">
                  <Form.Label>Bejelentés állapota</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Talált"
                    value="t"
                    checked={formData.color === "t"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    name="status"
                  />
                  <Form.Check
                    type="radio"
                    label="Keresett"
                    value="k"
                    checked={formData.color === "k"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    name="status"
                  />
                  <Form.Check
                    type="radio"
                    label="Látott"
                    value="l"
                    checked={formData.color === "l"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    name="status"
                  />
                </Form.Group>
                <Form.Group controlId="color">
                  <Form.Label>Cica színe</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Fehér"
                    value="feher"
                    checked={formData.color === "feher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Fekete"
                    value="fekete"
                    checked={formData.color === "fekete"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Barna"
                    value="barna"
                    checked={formData.color === "barna"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Vörös"
                    value="voros"
                    checked={formData.color === "voros"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Bézs"
                    value="bezs"
                    checked={formData.color === "bezs"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Szürke"
                    value="szurke"
                    checked={formData.color === "szurke"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Fekete - fehér"
                    value="feketefeher"
                    checked={formData.color === "feketefeher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Fekete - fehér - vörös"
                    value="feketefehervoros"
                    checked={formData.color === "feketefehervoros"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Fekete - vörös"
                    value="feketevoros"
                    checked={formData.color === "feketevoros"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Vörös - fehér"
                    value="vorosfeher"
                    checked={formData.color === "vorosfeher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Szürke - fehér"
                    value="szurkefeher"
                    checked={formData.color === "szurkefeher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Barna - fehér"
                    value="barnafeher"
                    checked={formData.color === "barnafeher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Barna - bézs"
                    value="barnabezs"
                    checked={formData.color === "barnabezs"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="radio"
                    label="Egyéb"
                    value="egyeb"
                    checked={formData.color === "egyeb"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="pattern">
                  <Form.Label>Cica mintája</Form.Label>

                  <Form.Check
                    type="radio"
                    label="Cirmos"
                    value="cirmos"
                    checked={formData.pattern === "cirmos"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="radio"
                    label="Foltos"
                    value="foltos"
                    checked={formData.pattern === "foltos"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="radio"
                    label="Egyszínű"
                    value="egyszinu"
                    checked={formData.pattern === "egyszinu"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="radio"
                    label="Teknőctarka"
                    value="teknoctarka"
                    checked={formData.pattern === "teknoctarka"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="radio"
                    label="Kopasz"
                    value="kopasz"
                    checked={formData.pattern === "kopasz"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="radio"
                    label="Fóka"
                    value="foka"
                    checked={formData.pattern === "foka"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="radio"
                    label="Kalikó"
                    value="kaliko"
                    checked={formData.pattern === "kaliko"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
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
      </Modal >

      {loading ? (
        <p> Betöltés...</p>
      ) : szuresLISTA && szuresLISTA.length > 0 ? (
        <div>
          <h3>Eredmények:</h3>
          <div className="card-deck">
            {szuresLISTA.map((macska) => (
              <MacsCard key={macska.id} adat={macska} />
            ))}
          </div>
        ) : (
          <p style={{ color: "black" }}>Nincs találat.</p>
        )
      }
    </div >
  );
};

export default Szures;