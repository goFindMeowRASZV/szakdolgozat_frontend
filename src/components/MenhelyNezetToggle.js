import React from "react";
import useAuthContext from "../contexts/AuthContext";

export default function MenhelyNezetToggle({ viewMode, setViewMode }) {
  const { user } = useAuthContext();

  if (!user || (user.role !== 0 && user.role !== 1)) return null;

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <button
        onClick={() => setViewMode(viewMode === "card" ? "list" : "card")}
        className="btn btn-outline-dark"
      >
        Nézet: {viewMode === "card" ? "Kártyás" : "Listás"} ⇄
      </button>
    </div>
  );
}
