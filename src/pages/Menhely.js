import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiContext from "../contexts/ApiContext";
import useAuthContext from "../contexts/AuthContext";
import Szures from "../components/Szures";
import styles from "../Fonts.module.css";
import Kereses from "../components/Kereses";
import MenhelyCardNezet from "../components/MenhelyCardNezet.js";
import MenhelyListaNezet from "../components/MenhelyListaNezet.js";
import MenhelyNezetToggle from "../components/MenhelyNezetToggle.js";
import { myAxios } from "../contexts/MyAxios.js";
import "../assets/styles/SzuresKereses.css";

function Menhely() {
  const { menhelyLISTA, getMacsCardMenhely, setAktualisMacska } = useApiContext();
  const [viewMode, setViewMode] = useState("card");
  const navigate = useNavigate();
  const [szuresEredmeny, setSzuresEredmeny] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [kereso, setKereso] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    await getMacsCardMenhely();
    setLoading(false);
  };

  const handleItemClick = (elem) => {
    setAktualisMacska(elem);
    navigate(`/MacskaProfil`);
  };

  const handleSearch = async (keyword) => {
    setKereso(keyword);
    if (!keyword.trim()) {
      setSearchResults(null);
      return;
    }

    setLoading(true);
    try {
      const { data } = await myAxios.get(`/api/sheltered-reports-search?q=${keyword}`);
      setSearchResults(data);
    } catch (error) {
      console.error("Hiba a keresés során:", error);
    } finally {
      setLoading(false);
    }
  };

  let megjelenitendoLista = [];
  if (searchResults !== null) {
    megjelenitendoLista = searchResults;
  } else if (szuresEredmeny !== null) {
    megjelenitendoLista = szuresEredmeny;
  } else {
    megjelenitendoLista = menhelyLISTA || [];
  }

  const isEmpty = !loading && megjelenitendoLista.length === 0;

  return (
    <div className="galeriaBody" style={{ paddingTop: "60px" }}>
      <h1 className={styles.aesthetic}>Gazdikereső cicáink</h1>

      <div className="szuresKereses">
        <Szures type="sheltered" onSzures={(res) => {
          setSearchResults(null);
          setSzuresEredmeny(res);
        }} />
        <Kereses onSearch={handleSearch} />
      </div>

      <MenhelyNezetToggle viewMode={viewMode} setViewMode={setViewMode} />

      {loading ? (
        <div className="loader-container-szures">
          <img src="/images/loading.gif" alt="Betöltés..." className="loader-gif" />
        </div>
      ) : isEmpty ? (
        <p className="text-center mt-4">Nincs találat a megadott feltételek alapján.</p>
      ) : viewMode === "card" ? (
        <MenhelyCardNezet data={megjelenitendoLista} onCardClick={handleItemClick} />
      ) : (
        <MenhelyListaNezet data={megjelenitendoLista} onRowClick={handleItemClick} />
      )}
    </div>
  );
}

export default Menhely;
