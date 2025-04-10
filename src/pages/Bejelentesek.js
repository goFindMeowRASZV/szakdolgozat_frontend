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

function Bejelentesek() {
  const { macskaLISTA, getMacsCard, setAktualisMacska } = useApiContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [kereso, setKereso] = useState("");
  const [viewMode, setViewMode] = useState("card");

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
        // üres keresés esetén visszatérünk az eredeti listához
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

  const megjelenitendoLista =
    searchResults && Array.isArray(searchResults) && searchResults.length > 0
      ? searchResults
      : Array.isArray(macskaLISTA)
      ? macskaLISTA
      : [];

  return (
    <>
      <Szures type="reports" />
      <div className="px-4 pb-8">
        <Kereses
          onSearch={(keyword) => {
            handleSearch(keyword);
            setKereso(keyword);
          }}
        />
        <MenhelyNezetToggle viewMode={viewMode} setViewMode={setViewMode} />
        <h1 className="text-2xl font-bold text-center my-8">Bejelentések</h1>

        {viewMode === "card" ? (
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
