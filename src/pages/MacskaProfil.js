import React, { useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import useApiContext from "../contexts/ApiContext";
import Kommenteles from "../components/Kommenteles";
import OrokbefogadasModal from "../components/OrokbefogadasModal";
import "../assets/styles/MacskaProfil.css";
import OrokbeadasModal from "../components/OrokbeadasModal";
import VendegFigyelmeztetoModal from "../components/VendegFigyelmeztetoModal";

import ActionDropdown from "../components/ActionDropdown";

function MacskaProfil() {
  const { user } = useAuthContext();
  const { aktualisMacska, shelterCat } = useApiContext();

  const [showModal, setShowModal] = useState(false);
  const [showOrokbeadasModal, setShowOrokbeadasModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  const handleShelter = (e) => {
    e.preventDefault();
    const formData = {
      rescuer: user.id,
      report: aktualisMacska.report_id,
      s_status: "a",
    };
    shelterCat(formData, "/api/staff/create-sheltered-cat");
  };

  return (
    <div className="profilContainer" style={{ position: "relative" }}>
      {(user?.role === 0 || user?.role === 1) && (
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <ActionDropdown macska={aktualisMacska} />
        </div>
      )}

      <div className="profilAdatok">
        <div className="profilKepElem">
          <img className="profilKep" src={aktualisMacska.photo} alt="macska" />
        </div>

        <div className="profilInfo">
          {aktualisMacska.status !== "m" && (
            <p>
              <strong>Bejelentés típusa:</strong>
              {aktualisMacska.status === "k"
                ? "Keresett"
                : aktualisMacska.status === "t"
                ? "Talált"
                : aktualisMacska.status === "l"
                ? "Látott"
                : aktualisMacska.status}
            </p>
          )}

          <p>
            <strong>Szín:</strong> {aktualisMacska.color}
          </p>
          <p>
            <strong>Minta:</strong> {aktualisMacska.pattern}
          </p>
          <p>
            <strong>Ismertetőjel:</strong>{" "}
            {aktualisMacska.other_identifying_marks || "-"}
          </p>
          <p>
            <strong>Egészségügyi állapot:</strong>{" "}
            {aktualisMacska.health_status || "-"}
          </p>
          <p>
            <strong>Chip:</strong> {aktualisMacska.chip_number || "-"}
          </p>
          <p>
            <strong>Körülmények:</strong> {aktualisMacska.circumstances || "-"}
          </p>
          <p>
            <strong>Esemény dátuma:</strong> {aktualisMacska.event_date || "-"}
          </p>
        </div>
      </div>

      {/* VENDÉG FELHASZNÁLÓ (role 2) ÖRÖKBEFOGADÁS */}
      {user?.role === 2 && aktualisMacska.status === "m" && (
        <>
          <button
            className="profilFormBtn"
            onClick={() => {
              if (user) {
                setShowModal(true);
              } else {
                setShowGuestModal(true);
              }
            }}
          >
            Örökbefogadom
          </button>

          <OrokbefogadasModal
            show={showModal}
            onClose={() => setShowModal(false)}
            macska={aktualisMacska}
            user={user}
          />

          <VendegFigyelmeztetoModal
            show={showGuestModal}
            onClose={() => setShowGuestModal(false)}
          />
        </>
      )}

      {/* STAFF FELHASZNÁLÓ (role 1) ÖRÖKBEADÁS */}
      {user?.role === 1 && aktualisMacska.status === "m" && (
        <>
          <button
            className="profilFormBtn"
            onClick={() => setShowOrokbeadasModal(true)}
          >
            Örökbeadás
          </button>

          <OrokbeadasModal
            show={showOrokbeadasModal}
            onClose={() => setShowOrokbeadasModal(false)}
            macska={aktualisMacska}
          />
        </>
      )}

 {aktualisMacska.status !== "m" && user?.role === 1 && (
        <button className="profilFormBtn" onClick={handleShelter}>
          Befogás
        </button>
      )}

      <Kommenteles reportId={aktualisMacska.report_id} />
    </div>
  );
}

export default MacskaProfil;
