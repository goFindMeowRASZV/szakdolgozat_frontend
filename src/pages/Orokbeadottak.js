import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiContext from "../contexts/ApiContext";
import styles from "../Fonts.module.css";
import Kereses from "../components/Kereses";
import MenhelyListaNezet from "../components/MenhelyListaNezet.js";
import MenhelyNezetToggle from "../components/MenhelyNezetToggle.js";
import { myAxios } from "../contexts/MyAxios.js";
import "../assets/styles/SzuresKereses.css";
import "../assets/styles/NavBar.css";
import CardNezet from "../components/CardNezet.js";

function Orokbeadottak() {
  const {
    orokbeadottMenhelyLISTA,
    getOrokbeadottMacsCardMenhely,
    setAktualisMacska,
  } = useApiContext();
  const [viewMode, setViewMode] = useState("card");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(null);
  const [kereso, setKereso] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await getOrokbeadottMacsCardMenhely();
    setLoading(false);
  };

  const handleItemClick = (elem) => {
    navigate(`/MacskaProfil`);
    setAktualisMacska(elem);
  };

  const handleSearch = async (keyword) => {
    try {
      setKereso(keyword);
      if (keyword.trim() === "") {
        setSearchResults(null);
        return;
      }

      const { data } = await myAxios.get(
        `/api/sheltered-reports-search?q=${keyword}`
      );
      setSearchResults(data);
    } catch (error) {
      console.error("Hiba a keresés során:", error);
    }
  };

  const megjelenitendoLista =
    searchResults !== null ? searchResults : orokbeadottMenhelyLISTA || [];

  return (
    <div className="galeriaBody" style={{ paddingTop: "60px" }}>
      <h1 className={styles.aesthetic}>Örökbeadott cicáink</h1>

      <div className="nezetToggle">
        <MenhelyNezetToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <div className="szuresKereses">
        <div className="kereses-wrapper">
          <Kereses onSearch={handleSearch} />
        </div>
      </div>

      {loading ? (
        <div className="loader-container-szures">
          <img
            src="/images/loading.gif"
            alt="Betöltés..."
            className="loader-gif"
          />
        </div>
      ) : megjelenitendoLista.length > 0 ? (
        viewMode === "card" ? (
          <CardNezet data={megjelenitendoLista} onCardClick={handleItemClick} />
        ) : (
          <MenhelyListaNezet
            data={megjelenitendoLista}
            onRowClick={handleItemClick}
          />
        )
      ) : (
        <p className="text-center text-gray-500 py-6">
          Jelenleg nincs örökbeadott cica.
        </p>
      )}
    </div>
  );
}

export default Orokbeadottak;
