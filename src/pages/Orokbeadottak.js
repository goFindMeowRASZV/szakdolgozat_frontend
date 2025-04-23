import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiContext from "../contexts/ApiContext";
import Szures from "../components/Szures";
import styles from "../Fonts.module.css";
import Kereses from "../components/Kereses";
import MenhelyListaNezet from "../components/MenhelyListaNezet.js";
import MenhelyNezetToggle from "../components/MenhelyNezetToggle.js";
import { myAxios } from "../contexts/MyAxios.js";
import "../assets/styles/SzuresKereses.css";

function Orokbeadottak() {
  const {
    orokbeadottMenhelyLISTA,
    getOrokbeadottMacsCardMenhely,
    setAktualisMacska,
  } = useApiContext();
  const [viewMode, setViewMode] = useState("card");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [szuresEredmeny, setSzuresEredmeny] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
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
        fetchData();
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

  let megjelenitendoLista = [];

  if (searchResults && searchResults.length > 0) {
    megjelenitendoLista = searchResults;
  } else if (!kereso) {
    megjelenitendoLista = orokbeadottMenhelyLISTA || [];
  }

  return (
    <div className="galeriaBody" style={{ paddingTop: "60px" }}>
      <h1 className={styles.aesthetic}>Örökbeadott cicáink</h1>
      <div className="szuresKereses">
        <Kereses
          onSearch={(keyword) => {
            handleSearch(keyword);
          }}
        />
      </div>

      {loading ? (
        <div className="loader-container">
          <img
            src="/images/loading.gif"
            alt="Betöltés..."
            className="loader-gif"
          />
        </div>
      ) : megjelenitendoLista.length > 0 ? (
        <MenhelyListaNezet
          data={megjelenitendoLista}
          onRowClick={handleItemClick}
        />
      ) : (
        <p className="text-center text-gray-500 py-6">
          Jelenleg nincs örökbeadott cica.
        </p>
      )}
    </div>
  );
}

export default Orokbeadottak;
