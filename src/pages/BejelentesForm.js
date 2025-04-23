import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import useAuthContext from "../contexts/AuthContext";
import "../assets/styles/Bejelentes.css";

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
    photo: null,
    chip_number: "",
    circumstances: "",
    number_of_individuals: "",
    disappearance_date: "",
    activity: 1,
    lat: 1,
    lon: 1,
  });

  const requiredFields = [
    "status",
    "address",
    "color",
    "pattern",
    "photo",
    "number_of_individuals",
    "disappearance_date",
  ];

  const isFormValid = requiredFields.every((field) => {
    const value = formData[field];
    return field === "photo" ? value !== null : value !== "";
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "date") {
      const date = new Date(value).toISOString().split("T")[0];
      setFormData({ ...formData, [name]: date });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchAddressSuggestions = async (query) => {
    if (query.length < 3) return setSuggestions([]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
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
    setFormData({ ...formData, address, lat, lon });
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReport({ ...formData, creator_id: user.id }, "/api/create-report");
  };

  const requiredLabel = (label) => (
    <>
      {label}{" "}
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id={`tooltip-${label}`}>Kötelező mező</Tooltip>}
      >
        <span style={{ color: "red", cursor: "help" }}>*</span>
      </OverlayTrigger>
    </>
  );

  const labelInfo = (label) => (
    <>
      {label}{" "}
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id={`tooltip-${label}`}>15 karakter</Tooltip>}
      >
        <span style={{ color: "grey", fontSize: "small" }}>?</span>
      </OverlayTrigger>
    </>
  );

  return (
    <div className="bejelentes-wrapper">
      <h1>Új bejelentés</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="status">
              <Form.Label>{requiredLabel("Állapot")}</Form.Label>
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
            <Form.Group controlId="address" className="position-relative">
              <Form.Label>{requiredLabel("Cím")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adja meg a címet"
                name="address"
                autoComplete="off"
                value={formData.address}
                onChange={handleAddressChange}
              />
              {suggestions.length > 0 && (
                <div className="autocomplete-dropdown">
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      className="autocomplete-item"
                      onClick={() =>
                        selectAddress(item.display_name, item.lat, item.lon)
                      }
                    >
                      {item.display_name}
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="color">
              <Form.Label>{requiredLabel("Cica színe")}</Form.Label>
              <Form.Control
                as="select"
                name="color"
                value={formData.color}
                onChange={handleChange}
              >
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
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="pattern">
              <Form.Label>{requiredLabel("Cica mintája")}</Form.Label>
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
            name="other_identifying_marks"
            value={formData.other_identifying_marks}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="health_status">
          <Form.Label>Egészségügyi állapot</Form.Label>
          <Form.Control
            type="text"
            name="health_status"
            value={formData.health_status}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="circumstances">
          <Form.Label>Körülmények</Form.Label>
          <Form.Control
            type="text"
            name="circumstances"
            value={formData.circumstances}
            onChange={handleChange}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="photo">
              <Form.Label>{requiredLabel("Fájl feltöltés")}</Form.Label>
              <Form.Control type="file" name="photo" onChange={handleChange} />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="chip_number">
              <Form.Label>{labelInfo("Chip szám")}</Form.Label>
              <Form.Control
                type="number"
                name="chip_number"
                value={formData.chip_number}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="number_of_individuals">
              <Form.Label>{requiredLabel("Példányok száma")}</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="10"
                name="number_of_individuals"
                value={formData.number_of_individuals}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="disappearance_date">
              <Form.Label>{requiredLabel("Dátum")}</Form.Label>
              <Form.Control
                type="date"
                name="disappearance_date"
                value={formData.disappearance_date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="dark"
          type="submit"
          className="mt-3"
          disabled={!isFormValid}
        >
          Beküldés
        </Button>
      </Form>
    </div>
  );
};

export default Bejelentes;
