import React from "react";
import "../assets/styles/MacsCard.css"; // importáljuk a hozzá tartozó CSS-t

function MacsCard({ adat }) {
  const statusMapping = {
    k: { label: "Keresett", color: "red" },
    l: { label: "Látott", color: "blue" },
    t: { label: "Talált", color: "green" },
    m: { label: "Menhelyen", color: "orange" },
  };

  const formattedDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("hu-HU");
  };

  const status = statusMapping[adat.status?.toLowerCase()] || {
    label: "Ismeretlen",
    color: "gray",
  };

  return (
    <div className="cica">
      <img className="card-img" src={adat.photo} alt="Cica kép" />
      <div className="cica-leiras">
        <p className="cica-p">
          <span className={`status-badge ${status.color}`}>
            {status.label}
          </span>
        </p>
        <p className="cica-p">
          <strong>Létrehozva:</strong> {formattedDate(adat.created_at)}
        </p>
        {adat.other_identifying_marks && (
          <p className="cica-p">
            <strong>Ismertetőjegyek:</strong> {adat.other_identifying_marks}
          </p>
        )}
        {adat.circumstances && (
          <p className="cica-p">
            <strong>Körülmények:</strong> {adat.circumstances}
          </p>
        )}
        {adat.status?.toLowerCase() === "k" && adat.disappearance_date && (
          <p className="cica-p">
            <strong>Eltűnés dátuma:</strong>{" "}
            {formattedDate(adat.disappearance_date)}
          </p>
        )}
      </div>
    </div>
  );
}

export default MacsCard;
