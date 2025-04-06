import React, { useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import Kommenteles from "../components/Kommenteles";
import useApiContext from "../contexts/ApiContext";
import OrokbefogadasModal from "../components/OrokbefogadasModal";

function MacskaProfil() {
  const { user } = useAuthContext();
  const { aktualisMacska, shelterCat } = useApiContext();

  const [showModal, setShowModal] = useState(false);

  const handleShelter = (e) => {
    e.preventDefault();

    const formData = {
      rescuer: user.id,
      report: aktualisMacska.report_id,
    };

    shelterCat(formData, "/api/shelter-cat");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        <div className="profilKepElem">
          <img className="profilKep" src={aktualisMacska.photo} alt="macska" />
        </div>
        <div>
          <p>
            <strong>Szín:</strong> {aktualisMacska.color}
          </p>
          <p>
            <strong>Minta:</strong> {aktualisMacska.pattern}
          </p>
        </div>
      </div>

      {aktualisMacska.status === "m" ? (
        <>
          <button onClick={() => setShowModal(true)}>Örökbefogadom</button>
          <OrokbefogadasModal
            show={showModal}
            onClose={() => setShowModal(false)}
            macska={aktualisMacska}
            user={user}
          />
        </>
      ) : (
        user?.role === 1 && <button onClick={handleShelter}>Befogás</button>
      )}

      <div style={{ marginTop: "20px", width: "100%" }} />
      <Kommenteles reportId={aktualisMacska.report_id} />
    </div>
  );
}

export default MacskaProfil;
