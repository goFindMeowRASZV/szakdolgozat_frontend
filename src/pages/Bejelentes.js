
import React, { useState } from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';

const Bejelentes = () => {
  const [formData, setFormData] = useState({
    status: '',
    address: '',
    color: [],
    pattern: [],
    other_identifying_marks: '',
    needs_help: false,
    healt_status: '',
    photo: null,
    chip_number: '',
    circumstances: '',
    number_of_individuals: 0,
    dissappearance_date: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else if (name === 'szin' || name === 'minta') {
      const updatedArray = [...formData[name]];
      if (updatedArray.includes(value)) {
        const index = updatedArray.indexOf(value);
        updatedArray.splice(index, 1);
      } else {
        updatedArray.push(value);
      }
      setFormData({ ...formData, [name]: updatedArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Form submit action here (e.g., API call)
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="status">
            <Form.Label>Állapot</Form.Label>
            <Form.Control as="select" name="status" value={formData.status} onChange={handleChange}>
              <option value="">Válasszon állapotot</option>
              <option value="talalt">Találtam</option>
              <option value="keresett">Keresem</option>
              <option value="latott">Láttam</option>
              <option value="menhely">Menhely</option>
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
            <Form.Label>Szín</Form.Label>
            <Form.Check
              type="checkbox"
              label="Fehér"
              value="fehér"
              checked={formData.color.includes('fehér')}
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
              value="vörös"
              checked={formData.color.includes('vörös')}
              onChange={handleChange}
              name="color"
            />
            <Form.Check
              type="checkbox"
              label="Bézs"
              value="bézs"
              checked={formData.color.includes('bézs')}
              onChange={handleChange}
              name="color"
            />
            <Form.Check
              type="checkbox"
              label="Szürke"
              value="szürke"
              checked={formData.color.includes('szürke')}
              onChange={handleChange}
              name="color"
            />
            <Form.Check
              type="checkbox"
              label="Egyéb"
              value="egyéb"
              checked={formData.color.includes('egyéb')}
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
              value="egyszínű"
              checked={formData.pattern.includes('egyszínű')}
              onChange={handleChange}
              name="pattern"
            />
            <Form.Check
              type="checkbox"
              label="Teknőctarka"
              value="teknőctarka"
              checked={formData.pattern.includes('teknőctarka')}
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
              value="fóka"
              checked={formData.pattern.includes('fóka')}
              onChange={handleChange}
              name="pattern"
            />
            <Form.Check
              type="checkbox"
              label="Kalikó"
              value="kalikó"
              checked={formData.pattern.includes('kalikó')}
              onChange={handleChange}
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

      <Form.Group controlId="needs_help">
        <Form.Check
          type="checkbox"
          label="Segítségre szorul"
          name="needs_help"
          checked={formData.needs_help}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="health_status">
        <Form.Label>Egészségügyi állapot</Form.Label>
        <Form.Control
          type="text"
          placeholder="Adja meg az egészségi állapotot"
          name="health_status"
          value={formData.health_status}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="photo">
        <Form.Label>Kép</Form.Label>
        <Form.Control
          type="file"
          name="photo"
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
          type="range"
          min="1"
          max="10"
          name="number_of_individuals"
          value={formData.number_of_individuals}
          onChange={handleChange}
        />
        <Form.Text>{formData.number_of_individuals}</Form.Text>
      </Form.Group>

      <Form.Group controlId="disappearance_date">
        <Form.Label>Eltűnés dátuma</Form.Label>
        <Form.Control
          type="date"
          name="disappearance_date"
          value={formData.disappearance_date}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">Form Beküldése</Button>
    </Form>
  );
};
export default Bejelentes