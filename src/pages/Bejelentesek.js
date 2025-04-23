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

  useEffect(() => {
    getMacsCard();
  }, []);

  const toggleRowExpansion = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleEditClick = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

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

      const { data } = await myAxios.get(`/api/reports-search?q=${keyword}`);
      setSearchResults(data);
    } catch (error) {
      console.error("Hiba a keresés során:", error);
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
      <h1 className={styles.aesthetic}>Bejelentések</h1>
      <div className="szuresKereses">
        <Szures type="reports" onSzures={setSzuresEredmeny} />
        <Kereses
          onSearch={(keyword) => {
            handleSearch(keyword);
            setKereso(keyword);
          }}
        />
      </div>
      <div className="cicak px-4 pb-8">
        <MenhelyNezetToggle viewMode={viewMode} setViewMode={setViewMode} />
        {!megjelenitendoLista ? (
          <div className="loader-container">
            <img
              src="/images/loading.gif"
              alt="Betöltés..."
              className="loader-gif"
            />
          </div>
        ) : viewMode === "card" ? (
          <div className="kepek">
            {megjelenitendoLista.length > 0 ? (
              megjelenitendoLista.map((elem, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(elem)}
                  style={{ cursor: "pointer" }}
                >
                  <MacsCard adat={elem} index={index} />
                </div>
              ))
            ) : (
              <p className="text-center py-6">Nincsenek bejelentések.</p>
            )}
          </div>
        ) : (
          <BejelentesListaNezet
            data={megjelenitendoLista}
            expandedRow={expandedRow}
            toggleRowExpansion={toggleRowExpansion}
            onRowClick={handleCardClick}
            onEditClick={handleEditClick}
          />
        )}
      </div>

      {showModal && selectedReport && (
        <BejelentesModositasModal
          show={showModal}
          onClose={handleModalClose}
          report={selectedReport}
          isReport={true}
        />
      )}
    </>
  );
}

export default Bejelentesek;