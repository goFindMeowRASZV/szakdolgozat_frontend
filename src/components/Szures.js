import React, { useState } from "react";
import { Form, Button, Col, Row, Modal } from "react-bootstrap";
import useApiContext from "../contexts/ApiContext";
import MacsCard from "./MacsCard";
import { useNavigate } from "react-router-dom";

const Szures = ({ type }) => {
  const { getReportsFilter, getShelteredReportsFilter, szuresLISTA , setAktualisMacska} =
    useApiContext();
    const navigate = useNavigate();
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
    setLoading(false);
    setShowModal(false);
  };

  const handleCardClick = (elem) => {
    navigate(`/MacskaProfil`);
    setAktualisMacska(elem);
    console.log(elem);
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
              {type === "reports"
              ? <Form.Group controlId="status">
              <Form.Label>Bejelentés állapota</Form.Label>
              <Form.Check
                type="checkbox"
                label="Talált"
                value="t"
                checked={formData.status === "t"}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                name="status"
              />
              <Form.Check
                type="checkbox"
                label="Keresett"
                value="k"
                checked={formData.status === "k"}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                name="status"
              />
              <Form.Check
                type="checkbox"
                label="Látott"
                value="l"
                checked={formData.status === "l"}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                name="status"
              />
            </Form.Group>
              : ""}
                <Form.Group controlId="color">
                  <Form.Label>Cica színe</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Fehér"
                    value="feher"
                    checked={formData.color === "feher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Fekete"
                    value="fekete"
                    checked={formData.color === "fekete"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Barna"
                    value="barna"
                    checked={formData.color === "barna"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Vörös"
                    value="voros"
                    checked={formData.color === "voros"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Bézs"
                    value="bezs"
                    checked={formData.color === "bezs"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Szürke"
                    value="szurke"
                    checked={formData.color === "szurke"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Fekete - fehér"
                    value="feketefeher"
                    checked={formData.color === "feketefeher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Fekete - fehér - vörös"
                    value="feketefehervoros"
                    checked={formData.color === "feketefehervoros"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Fekete - vörös"
                    value="feketevoros"
                    checked={formData.color === "feketevoros"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Vörös - fehér"
                    value="vorosfeher"
                    checked={formData.color === "vorosfeher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Szürke - fehér"
                    value="szurkefeher"
                    checked={formData.color === "szurkefeher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Barna - fehér"
                    value="barnafeher"
                    checked={formData.color === "barnafeher"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Barna - bézs"
                    value="barnabezs"
                    checked={formData.color === "barnabezs"}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    name="color"
                  />
                  <Form.Check
                    type="checkbox"
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
                    type="checkbox"
                    label="Cirmos"
                    value="cirmos"
                    checked={formData.pattern === "cirmos"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Foltos"
                    value="foltos"
                    checked={formData.pattern === "foltos"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Egyszínű"
                    value="egyszinu"
                    checked={formData.pattern === "egyszinu"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Teknőctarka"
                    value="teknoctarka"
                    checked={formData.pattern === "teknoctarka"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Kopasz"
                    value="kopasz"
                    checked={formData.pattern === "kopasz"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Fóka"
                    value="foka"
                    checked={formData.pattern === "foka"}
                    onChange={(e) =>
                      setFormData({ ...formData, pattern: e.target.value })
                    }
                    name="pattern"
                  />
                  <Form.Check
                    type="checkbox"
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
            {szuresLISTA.map((elem, index) => (
             <div
             key={index}
             onClick={() => handleCardClick(elem)}
             style={{ cursor: "pointer" }}
           >
             <MacsCard adat={elem} index={elem.id} />
           </div>
            ))}
          </div>
          </div>
        ) : (
          <p style={{ color: "black" }}>Nincs találat.</p>
        )
      }
    </div >
  );
};

export default Szures;