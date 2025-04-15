import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiContext from "../contexts/ApiContext";
import Szures from "../components/Szures";
import styles from "../Fonts.module.css";
import Kereses from "../components/Kereses";
import MenhelyListaNezet from "../components/MenhelyListaNezet.js";
import MenhelyNezetToggle from "../components/MenhelyNezetToggle.js";
import { myAxios } from "../contexts/MyAxios.js";
import "../SzuresKereses.css";

function Orokbeadottak() {
  const {
    orokbeadottMenhelyLISTA,
    getOrokbeadottMacsCardMenhely,
    setAktualisMacska,
  } = useApiContext();
  const [viewMode, setViewMode] = useState("card");
  const navigate = useNavigate();
  const [szuresEredmeny, setSzuresEredmeny] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [kereso, setKereso] = useState("");

  useEffect(() => {
    getOrokbeadottMacsCardMenhely();
  }, []);

  const handleItemClick = (elem) => {
    navigate(`/MacskaProfil`);
    setAktualisMacska(elem);
  };
  const handleSearch = async (keyword) => {
    try {
      if (keyword.trim() === "") {
        // üres keresés esetén visszatérünk az eredeti listához
        getOrokbeadottMacsCardMenhely();
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
  } else {
    megjelenitendoLista = orokbeadottMenhelyLISTA || [];
  }

  return (
    <div className="galeriaBody" style={{ paddingTop: "60px" }}>
      <h1 className={styles.aesthetic}>Örökbeadott cicáink</h1>
      <div className="szuresKereses">
        <Kereses
          onSearch={(keyword) => {
            handleSearch(keyword);
            setKereso(keyword);
          }}
        />
      </div>

      <MenhelyListaNezet
        data={megjelenitendoLista}
        onRowClick={handleItemClick}
      />
    </div>
  );
}

export default Orokbeadottak;
