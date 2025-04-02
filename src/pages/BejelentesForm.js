import React, { useState } from "react";
import { Form, Button, Col, Row, InputGroup, ListGroup } from "react-bootstrap";
import useAuthContext from "../contexts/AuthContext";
import "../Bejelentes.css";

const Bejelentes = () => {
  const { createReport, user } = useAuthContext();
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    status: "",
    address: "",
    color: "",
    pattern: "",
    other_identifying_marks: "",
    health_status: "",
    health_status: "",
    photo: null,
    chip_number: "",
    circumstances: "",
    number_of_individuals: 0,
    disappearance_date: "",
    activity: 1,
    lat: 1,
    lon: 1,
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

  // Cím keresése Nominatim API-val
  const fetchAddressSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);

      // Kiírás a koordinátákról, ha vannak
      data.forEach((item) => {
        if (item.lat && item.lon) {
          console.log(`Cím: ${item.display_name}`);
          console.log(`Szélesség: ${item.lat}, Hosszúság: ${item.lon}`);
        }
      });
    } catch (error) {
      console.error("Hiba a cím keresésekor:", error);
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, address: value });
    fetchAddressSuggestions(value);
  };

  const selectAddress = (address, lat, lon) => {
    setFormData({
      ...formData,
      address,
      lat, // Beállítjuk a szélességet
      lon, // Beállítjuk a hosszúságot
    });
    setSuggestions([]);
    console.log(`Kiválasztott cím: ${address}`);
    console.log(`Szélesség: ${lat}, Hosszúság: ${lon}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user.id);
    setFormData({ ...formData, creator_id: user.id });
    console.log(formData);

    createReport(formData, "/api/create-report");
  };

  return (
    <div className="bejelentes-wrapper">
      <h1>Új bejelentés</h1>
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
                onChange={handleAddressChange}
              />
              {suggestions.length > 0 && (
                <ListGroup>
                  {suggestions.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      onClick={() =>
                        selectAddress(item.display_name, item.lat, item.lon)
                      }
                    >
                      {item.display_name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="color" className="select-dropdown">
              <Form.Label>Cica színe</Form.Label>
              <Form.Control
                as="select"
                name="color"
                value={formData.color}
                onChange={handleChange}
              >
                <option value="">Válassz színt</option>
                <option value="bezs">Bézs</option>
                <option value="feher">Fehér</option>
                <option value="barna">Barna</option>
                <option value="voros">Vörös</option>
                <option value="fekete">Fekete</option>
                <option value="szurke">Szürke</option>
                <option value="barnabezs">Barna + bézs</option>
                <option value="vorosfeher">Vörös + fehér</option>
                <option value="barnafeher">Barna + fehér</option>
                <option value="feketefeher">Fekete + fehér</option>
                <option value="feketevoros">Fekete + vörös</option>
                <option value="szurkefeher">Szürke + fehér</option>
                <option value="feketefehervoros">Fekete + fehér + vörös</option>
                <option value="egyeb">Egyéb</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="pattern" className="select-dropdown">
              <Form.Label>Cica mintája</Form.Label>
              <Form.Control
                as="select"
                name="pattern"
                value={formData.pattern}
                onChange={handleChange}
              >
                <option value="">Válassz mintát</option>
                <option value="cirmos">Cirmos</option>
                <option value="foltos">Foltos</option>
                <option value="egyszinu">Egyszínű</option>
                <option value="teknoctarka">Teknőctarka</option>
                <option value="kopasz">Kopasz</option>
                <option value="foka">Fóka</option>
                <option value="kaliko">Kalikó</option>
              </Form.Control>
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
    </div>
  );
};
export default Bejelentes;
