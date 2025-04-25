import React from "react";
import useAuthContext from "../contexts/AuthContext";

export default function MenhelyNezetToggle({ viewMode, setViewMode }) {
  const { user } = useAuthContext();

  if (!user || (user.role !== 0 && user.role !== 1)) return null;

  return (
    <div className="nezetToggle">
      <button
        onClick={() => setViewMode(viewMode === "card" ? "list" : "card")}
        className="btn btn-outline-dark nezet-toggle-btn"
        title="Nézetváltás"
      >
        <span className="toggle-text">Nézet </span>⇄
      </button>
    </div>
  );
}
