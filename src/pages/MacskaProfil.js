import React, { useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import useApiContext from "../contexts/ApiContext";
import Kommenteles from "../components/Kommenteles";
import OrokbefogadasModal from "../components/OrokbefogadasModal";
import "../assets/styles/MacskaProfil.css";
import OrokbeadasModal from "../components/OrokbeadasModal";

function MacskaProfil() {
  const { user } = useAuthContext();
  const { aktualisMacska, shelterCat } = useApiContext();

  const [showModal, setShowModal] = useState(false);
  const [showOrokbeadasModal, setShowOrokbeadasModal] = useState(false);

  const handleShelter = (e) => {
    e.preventDefault();
    const formData = {
      rescuer: user.id,
      report: aktualisMacska.report_id,
    };
    shelterCat(formData, "/api/staff/create-sheltered-cat");
  };

  return (
    <div className="profilContainer">
      <div className="profilAdatok">
        <div className="profilKepElem">
          <img className="profilKep" src={aktualisMacska.photo} alt="macska" />
        </div>

        <div className="profilInfo">
        {aktualisMacska.status !== "m" && (
          <p>
            <strong>Bejelentés típusa:</strong> 
            {aktualisMacska.status === "k" ? "Keresett" :
             aktualisMacska.status === "t" ? "Talált" :
             aktualisMacska.status === "l" ? "Látott" :
             aktualisMacska.status}
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
            <strong>Dátum:</strong> {aktualisMacska.disappearance_date || "-"}
          </p>
        </div>
      </div>
      {aktualisMacska.status === "m" && (
        <>
          <button className="profilFormBtn" onClick={() => setShowModal(true)}>
            Örökbefogadom
          </button>
          <OrokbefogadasModal
            show={showModal}
            onClose={() => setShowModal(false)}
            macska={aktualisMacska}
            user={user}
          />

          <button
            onClick={() => setShowOrokbeadasModal(true)}
            className="profilFormBtn"
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
