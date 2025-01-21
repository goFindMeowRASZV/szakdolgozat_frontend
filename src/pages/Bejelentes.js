
import React, { useState } from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';

const Bejelentes = () => {
  const [formData, setFormData] = useState({
    allapot: '',
    cim: '',
    szin: [],
    minta: [],
    egyeb_ismertetojel: '',
    segitsegre_szorul: false,
    egeszsegugyi_allapot: '',
    kep: null,
    chipSzam: '',
    korulmenyek: '',
    peldanyok_szama: 0,
    eltunes_datuma: ''
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
          <Form.Group controlId="allapot">
            <Form.Label>Állapot</Form.Label>
            <Form.Control as="select" name="allapot" value={formData.allapot} onChange={handleChange}>
              <option value="">Válasszon állapotot</option>
              <option value="found">Talált</option>
              <option value="looking">Keresett</option>
              <option value="seen">Látott</option>
              <option value="shelter">Menhely</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="cim">
            <Form.Label>Cím</Form.Label>
            <Form.Control
              type="text"
              placeholder="Adja meg a címet"
              name="cim"
              value={formData.cim}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group controlId="szin">
            <Form.Label>Szín</Form.Label>
            <Form.Check
              type="checkbox"
              label="Fehér"
              value="white"
              checked={formData.szin.includes('white')}
              onChange={handleChange}
              name="szin"
            />
            <Form.Check
              type="checkbox"
              label="Fekete"
              value="black"
              checked={formData.szin.includes('black')}
              onChange={handleChange}
              name="szin"
            />
            <Form.Check
              type="checkbox"
              label="Barna"
              value="brown"
              checked={formData.szin.includes('brown')}
              onChange={handleChange}
              name="szin"
            />
            <Form.Check
              type="checkbox"
              label="Vörös"
              value="red"
              checked={formData.szin.includes('red')}
              onChange={handleChange}
              name="szin"
            />
            <Form.Check
              type="checkbox"
              label="Bézs"
              value="beige"
              checked={formData.szin.includes('beige')}
              onChange={handleChange}
              name="szin"
            />
            <Form.Check
              type="checkbox"
              label="Szürke"
              value="grey"
              checked={formData.szin.includes('grey')}
              onChange={handleChange}
              name="szin"
            />
            <Form.Check
              type="checkbox"
              label="Egyéb"
              value="else"
              checked={formData.szin.includes('else')}
              onChange={handleChange}
              name="szin"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="minta">
            <Form.Label>Minta</Form.Label>
            <Form.Check
              type="checkbox"
              label="Cirmos"
              value="tabby"
              checked={formData.minta.includes('tabby')}
              onChange={handleChange}
              name="minta"
            />
            <Form.Check
              type="checkbox"
              label="Foltos"
              value="spotted"
              checked={formData.minta.includes('spotted')}
              onChange={handleChange}
              name="minta"
            />
            <Form.Check
              type="checkbox"
              label="Egyszínű"
              value="solid"
              checked={formData.minta.includes('solid')}
              onChange={handleChange}
              name="minta"
            />
            <Form.Check
              type="checkbox"
              label="Teknőctarka"
              value="tortoiseshell"
              checked={formData.minta.includes('tortoiseshell')}
              onChange={handleChange}
              name="minta"
            />
            <Form.Check
              type="checkbox"
              label="Kopasz"
              value="bald"
              checked={formData.minta.includes('bald')}
              onChange={handleChange}
              name="minta"
            />
            <Form.Check
              type="checkbox"
              label="Fóka"
              value="seal"
              checked={formData.minta.includes('seal')}
              onChange={handleChange}
              name="minta"
            />
            <Form.Check
              type="checkbox"
              label="Kalikó"
              value="calico"
              checked={formData.minta.includes('calico')}
              onChange={handleChange}
              name="minta"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="egyeb_ismertetojel">
        <Form.Label>Egyéb ismertetőjel</Form.Label>
        <Form.Control
          type="text"
          placeholder="Adja meg a további ismertetőjeleket"
          name="egyeb_ismertetojel"
          value={formData.egyeb_ismertetojel}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="segitsegre_szorul">
        <Form.Check
          type="checkbox"
          label="Segítségre szorul"
          name="segitsegre_szorul"
          checked={formData.segitsegre_szorul}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="egeszsegugyi_allapot">
        <Form.Label>Egészségügyi állapot</Form.Label>
        <Form.Control
          type="text"
          placeholder="Adja meg az egészségi állapotot"
          name="egeszsegugyi_allapot"
          value={formData.egeszsegugyi_allapot}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="kep">
        <Form.Label>Kép</Form.Label>
        <Form.Control
          type="file"
          name="kep"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="chipSzam">
        <Form.Label>Chip szám</Form.Label>
        <Form.Control
          type="number"
          placeholder="Adja meg a chip számot"
          name="chipSzam"
          value={formData.chipSzam}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="korulmenyek">
        <Form.Label>Körülmények</Form.Label>
        <Form.Control
          type="text"
          placeholder="Adja meg a körülményeket"
          name="korulmenyek"
          value={formData.korulmenyek}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="peldanyok_szama">
        <Form.Label>Példányok száma</Form.Label>
        <Form.Control
          type="range"
          min="1"
          max="10"
          name="peldanyok_szama"
          value={formData.peldanyok_szama}
          onChange={handleChange}
        />
        <Form.Text>{formData.peldanyok_szama}</Form.Text>
      </Form.Group>

      <Form.Group controlId="eltunes_datuma">
        <Form.Label>Eltűnés dátuma</Form.Label>
        <Form.Control
          type="date"
          name="eltunes_datuma"
          value={formData.eltunes_datuma}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">Form Beküldése</Button>
    </Form>
  );
};
export default Bejelentes