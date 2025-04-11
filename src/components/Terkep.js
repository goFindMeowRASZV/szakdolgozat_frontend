import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Modal, Button, Form } from "react-bootstrap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useApiContext from "../contexts/ApiContext";
import { statusIcons } from "../assets/icons/MarkerIcons";
import "../Terkep.css";

// Alapértelmezett marker ikon beállítása
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function ClickableMap({ onMarkerAdd }) {
  useMapEvents({
    click(e) {
      onMarkerAdd(e.latlng);
    },
  });
  return null;
}

function Terkep() {
  const position = [47.4979, 19.0402];
  const zoom = 13;

  const { macskaLISTA, getMapReports } = useApiContext();

  const [markers, setMarkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLatLng, setCurrentLatLng] = useState(null);
  const [formData, setFormData] = useState({
    status: "",
    address: "",
    color: "",
    pattern: "",
  });

  useEffect(() => {
    getMapReports();
  }, []);

  useEffect(() => {
    getMapReports();
  }, []);

  useEffect(() => {
    console.log("macskaLISTA:", macskaLISTA);
  }, [macskaLISTA]);


  const handleMarkerAdd = (latlng) => {
    setCurrentLatLng(latlng);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMarkers([...markers, { latlng: currentLatLng, data: formData }]);
    setShowModal(false);
    setFormData({ status: "", address: "", color: "", pattern: "" });
  };

  return (
    <div>
      <h1>Térkép</h1>
      <div className = "terkep" style={{
        height: "40vw",
        width: "80%",
        margin: "0 auto", 
        borderRadius: "20px", 
        overflow: "hidden",
      }}>
        <MapContainer center={position} zoom={zoom} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickableMap onMarkerAdd={handleMarkerAdd} />
          {macskaLISTA &&
            macskaLISTA.map((macska, index) =>
              macska.lat && macska.lon ? (
                <Marker
                  key={index}
                  position={[macska.lat, macska.lon]}
                  icon={statusIcons[macska.status.toLowerCase()] || new L.Icon.Default()}
                >
                  <Popup>
                    <img src={macska.photo} alt="Cica kép" style={{ width: "100%" }} />
                    <br />
                    <strong>Koordináták:</strong>
                    {macska.lat?.toFixed(5)}, {macska.lon?.toFixed(5)}
                    <br />
                    <strong>Cím:</strong> {macska.address}
                  </Popup>
                </Marker>
              ) : null
            )}
        </MapContainer>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Új bejegyzés</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
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

            <Form.Group>
              <Form.Label>Cím</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adja meg a címet"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cica színe</Form.Label>
              <Form.Control type="text" name="color" value={formData.color} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cica mintája</Form.Label>
              <Form.Control type="text" name="pattern" value={formData.pattern} onChange={handleChange} />
            </Form.Group>

            <Button variant="dark" type="submit" className="mt-3">
              Mentés
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Terkep;
