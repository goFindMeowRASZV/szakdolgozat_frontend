import React, { useEffect } from "react";
import MacsCard from "../components/MacsCard.js";
import Szures from "../components/Szures.js";
import { useNavigate } from "react-router-dom";
import useApiContext from "../contexts/ApiContext.js";

function Menhely() {
  const { menhelyLISTA, getMacsCardMenhely, setAktualisMacska } =
    useApiContext();
  const navigate = useNavigate();
  // Amikor a komponens betöltődik, lekérjük az adatokat
  useEffect(() => {
    getMacsCardMenhely();
  }, []);

  const handleCardClick = (elem) => {
    navigate(`/MacskaProfil`);
    setAktualisMacska(elem);
    console.log(elem);
  };

  return (
    <div className="galeriaBody" style={{ paddingTop:'60px' }}>
      <h1 className="galeriaCim">GAZDIKERESŐ CICÁINK</h1>
      <div className="kepek">
      <Szures type="sheltered" />
        {menhelyLISTA ? (
          menhelyLISTA.map((elem, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(elem)}
              style={{ cursor: "pointer" }}
            >
              <MacsCard adat={elem} index={index} />
            </div>
          ))
        ) : (
          <p>Betöltés...</p>
        )}
      </div>
    </div>
  );
}

export default Menhely;
