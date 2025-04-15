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

function Menhely() {
  const { menhelyLISTA, getMacsCardMenhely, setAktualisMacska } =
    useApiContext();
  const [viewMode, setViewMode] = useState("card");
  const navigate = useNavigate();
  const [szuresEredmeny, setSzuresEredmeny] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [kereso, setKereso] = useState("");

  useEffect(() => {
    getMacsCardMenhely();
  }, []);

  const handleItemClick = (elem) => {
    navigate(`/MacskaProfil`);
    setAktualisMacska(elem);
  };
  const handleSearch = async (keyword) => {
    try {
      if (keyword.trim() === "") {
        // üres keresés esetén visszatérünk az eredeti listához
        getMacsCardMenhely();
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
  } else if (!kereso && szuresEredmeny && szuresEredmeny.length > 0) {
    megjelenitendoLista = szuresEredmeny;
  } else {
    megjelenitendoLista = menhelyLISTA || [];
  }

  return (
    <div className="galeriaBody" style={{ paddingTop: "60px" }}>
      <h1 className={styles.aesthetic}>Gazdikereső cicáink</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between flex-wrap gap-4 px-4 pt-4 pb-2">
        <Szures type="sheltered" onSzures={setSzuresEredmeny} />
        <Kereses
          onSearch={(keyword) => {
            handleSearch(keyword);
            setKereso(keyword);
          }}
        />
      </div>

      <MenhelyNezetToggle viewMode={viewMode} setViewMode={setViewMode} />
      {megjelenitendoLista ? (
        viewMode === "card" ? (
          <MenhelyCardNezet
            data={megjelenitendoLista}
            onCardClick={handleItemClick}
          />
        ) : (
          <MenhelyListaNezet
            data={megjelenitendoLista}
            onRowClick={handleItemClick}
          />
        )
      ) : (
        <p>Betöltés...</p>
      )}
    </div>
  );
}

export default Menhely;
