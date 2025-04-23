import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import useApiContext from "../contexts/ApiContext";
import { statusIcons } from "../assets/icons/MarkerIcons";
import "../assets/styles/Terkep.css";

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

export default function Terkep() {
  const position = [47.4979, 19.0402]; // Budapest
  const zoom = 13;

  const navigate = useNavigate();
  const { macskaLISTA, getMapReports, setAktualisMacska } = useApiContext();

  const [currentLatLng, setCurrentLatLng] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getMapReports();
  }, []);

  const handleMarkerAdd = (latlng) => {
    setCurrentLatLng(latlng);
    setShowModal(true);
  };

  const handlePopupClick = (macska) => {
    setAktualisMacska(macska);
    navigate("/MacskaProfil");
  };

  if (!macskaLISTA || macskaLISTA.length === 0) {
    return (
      <div className="loader-container">
        <img
          src="/images/loading.gif"
          alt="Betöltés..."
          className="loader-gif"
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center my-4">Térkép</h1>
      <div
        className="terkep"
        style={{
          height: "40vw",
          width: "80%",
          margin: "0 auto",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={position}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickableMap onMarkerAdd={handleMarkerAdd} />

          {macskaLISTA.map((macska, index) =>
            macska.lat && macska.lon ? (
              <Marker
                key={index}
                position={[macska.lat, macska.lon]}
                icon={
                  statusIcons[macska.status?.toLowerCase()] ||
                  new L.Icon.Default()
                }
              >
                <Popup>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePopupClick(macska)}
                  >
                    <img
                      src={macska.photo}
                      alt="Cica kép"
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                        marginBottom: "5px",
                      }}
                    />
                    <strong>Koordináták:</strong>{" "}
                    {macska.lat.toFixed(5)}, {macska.lon.toFixed(5)}
                    <br />
                    <strong>Cím:</strong> {macska.address}
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
}
