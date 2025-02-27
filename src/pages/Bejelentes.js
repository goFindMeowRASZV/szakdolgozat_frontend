import React, { useState } from "react";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import useAuthContext from "../model/contexts/AuthContext";

const Bejelentes = () => {
  const { createReport, user } = useAuthContext();
  const [formData, setFormData] = useState({
    status: "",
    address: "",
    color: "",
    pattern: "",
    other_identifying_marks: "",
    /*   needs_help: false, */
    health_status: "",
    health_status: "",
    photo: null,
    chip_number: "",
    circumstances: "",
    number_of_individuals: 0,
    disappearance_date: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "date") {
      const date = new Date(value);
      const formattedDate = date.toISOString().split("T")[0]; // Az első része ISO formátumnak, pl. '2025-02-04'
      setFormData({ ...formData, [name]: formattedDate });
      console.log(date);
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user.id);
    setFormData({ ...formData, creator_id: user.id });
    console.log(formData);

    createReport(formData, "/api/create-report");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="status">
            <Form.Label>Állapot</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Válasszon állapotot</option>
              <option value="t">Találtam</option>
              <option value="k">Keresem</option>
              <option value="l">Láttam</option>
              <option value="m">Menhely</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="address">
            <Form.Label>Cím</Form.Label>
            <Form.Control
              type="text"
              placeholder="Adja meg a címet"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
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

      <Form.Group controlId="other_identifying_marks">
        <Form.Label>Egyéb ismertetőjel</Form.Label>
        <Form.Control
          type="text"
          placeholder="Adja meg a további ismertetőjeleket"
          name="other_identifying_marks"
          value={formData.other_identifying_marks}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="health_status">
        <Form.Label>Egészségügyi állapot</Form.Label>
        <Form.Control
          type="text"
          placeholder="Adja meg az egészségi állapotot"
          name="health_status"
          value={formData.health_status || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="photo">
        <Form.Label>Kép</Form.Label>
        <Form.Control
          type="file"
          name="photo"
          //accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="chip_number">
        <Form.Label>Chip szám</Form.Label>
        <Form.Control
          type="number"
          placeholder="Adja meg a chip számot"
          name="chip_number"
          value={formData.chip_number}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="circumstances">
        <Form.Label>Körülmények</Form.Label>
        <Form.Control
          type="text"
          placeholder="Adja meg a körülményeket"
          name="circumstances"
          value={formData.circumstances}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="number_of_individuals">
        <Form.Label>Példányok száma</Form.Label>
        <Form.Control
          type="number"
          min="1"
          max="10"
          placeholder="Adja meg a példányszámot"
          name="number_of_individuals"
          value={formData.number_of_individuals}
          onChange={handleChange}
        />
        <Form.Text>{formData.number_of_individuals}</Form.Text>
      </Form.Group>

      <Form.Group controlId="disappearance_date">
        <Form.Label>Esemény dátuma</Form.Label>
        <Form.Control
          type="date"
          name="disappearance_date"
          value={formData.disappearance_date || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="dark" type="submit">
        Form Beküldése
      </Button>
    </Form>
  );
};
export default Bejelentes;
