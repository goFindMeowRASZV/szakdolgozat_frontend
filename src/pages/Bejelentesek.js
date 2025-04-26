import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiContext from "../contexts/ApiContext";
import useAuthContext from "../contexts/AuthContext";
import Szures from "../components/Szures";
import BejelentesModositasModal from "../components/BejelentesModositasModal.js";
import Kereses from "../components/Kereses";
import { myAxios } from "../contexts/MyAxios.js";
import MacsCard from "../components/MacsCard.js";
import MenhelyNezetToggle from "../components/MenhelyNezetToggle";
import BejelentesListaNezet from "../components/BejelentesListaNezet";
import styles from "../Fonts.module.css";
import "../assets/styles/SzuresKereses.css";
import CardNezet from "../components/CardNezet.js";

function Bejelentesek() {
  const { macskaLISTA, getMacsCard, setAktualisMacska } = useApiContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [kereso, setKereso] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [szuresEredmeny, setSzuresEredmeny] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getMacsCard();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedReport(null);
    getMacsCard();
  };

  const handleSearch = async (keyword) => {
    try {
      if (keyword.trim() === "") {
        getMacsCard();
        setSearchResults(null);
        return;
      }

      setLoading(true);
      const { data } = await myAxios.get(`/api/reports-search?q=${keyword}`);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      console.error("Hiba a keresés során:", error);
      setLoading(false);
    }
  };

  const handleCardClick = (elem) => {
    setAktualisMacska(elem);
    navigate("/MacskaProfil");
  };

  let megjelenitendoLista = null;

  if (searchResults && searchResults.length > 0) {
    megjelenitendoLista = searchResults;
  } else if (!kereso && szuresEredmeny && szuresEredmeny.length > 0) {
    megjelenitendoLista = szuresEredmeny;
  } else if (macskaLISTA && macskaLISTA.length >= 0) {
    megjelenitendoLista = macskaLISTA;
  }

  return (
    <>
      <div className="galeriaBody" style={{ paddingTop: "20px" }}>
      <h1 className={styles.aesthetic}>Bejelentések</h1>
        <div className="nezetToggle">
          <MenhelyNezetToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        <div className="szuresKereses">
          <Szures type="reports" onSzures={setSzuresEredmeny} />
          <div className="kereses-wrapper">
            <Kereses
              onSearch={(keyword) => {
                handleSearch(keyword);
                setKereso(keyword);
              }}
            />
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
        ) : viewMode === "card" ? (
          <CardNezet data={megjelenitendoLista} onCardClick={handleCardClick} />
        ) : (
          <BejelentesListaNezet
            data={megjelenitendoLista}
            onRowClick={handleCardClick}
          />
        )}

        {showModal && selectedReport && (
          <BejelentesModositasModal
            show={showModal}
            onClose={handleModalClose}
            report={selectedReport}
            isReport={true}
          />
        )}
      </div>
    </>
  );
}

export default Bejelentesek;
