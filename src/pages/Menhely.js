import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiContext from "../contexts/ApiContext";
import useAuthContext from "../contexts/AuthContext";
import Szures from "../components/Szures";

import MenhelyCardNezet from "../components/MenhelyCardNezet.js";
import MenhelyListaNezet from "../components/MenhelyListaNezet.js";
import MenhelyNezetToggle from "../components/MenhelyNezetToggle.js";

function Menhely() {
  const { menhelyLISTA, getMacsCardMenhely, setAktualisMacska } = useApiContext();
  const [viewMode, setViewMode] = useState("card");
  const navigate = useNavigate();

  useEffect(() => {
    getMacsCardMenhely();
  }, []);

  const handleItemClick = (elem) => {
    navigate(`/MacskaProfil`);
    setAktualisMacska(elem);
  };

  return (
    <div className="galeriaBody" style={{ paddingTop: "60px" }}>
      <h1 className="galeriaCim">GAZDIKERESŐ CICÁINK</h1>

      <MenhelyNezetToggle viewMode={viewMode} setViewMode={setViewMode} />
      {menhelyLISTA ? (
        viewMode === "card" ? (
          <MenhelyCardNezet data={menhelyLISTA} onCardClick={handleItemClick} />
        ) : (
          <MenhelyListaNezet data={menhelyLISTA} onRowClick={handleItemClick} />
        )
      ) : (
        <p>Betöltés...</p>
      )}
    </div>
  );
}

export default Menhely;
