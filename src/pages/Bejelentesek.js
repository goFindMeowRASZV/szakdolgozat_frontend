import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiContext from "../contexts/ApiContext";
import useAuthContext from "../contexts/AuthContext";
import Szures from "../components/Szures";
import BejelentesModositasModal from "../components/BejelentesModositasModal.js";
import Kereses from "../components/Kereses";
import { myAxios } from "../contexts/MyAxios.js";
import MacsCard from "../components/MacsCard.js";

function Bejelentesek() {
  const { macskaLISTA, getMacsCard, setAktualisMacska } = useApiContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [kereso, setKereso] = useState("");

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
      <div className="px-4 pb-8">
        <Kereses
          onSearch={(keyword) => {
            handleSearch(keyword);
            setKereso(keyword);
          }}
        />
        <h1 className="text-2xl font-bold text-center my-8">Bejelentések</h1>

        {user?.role === 2 ? (
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
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Bejelentő</th>
                  <th className="px-4 py-2">Státusz</th>
                  <th className="px-4 py-2">Létrehozva</th>
                  <th className="px-4 py-2">Cím</th>
                  <th className="px-4 py-2">További adatok</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                {megjelenitendoLista?.length ? (
                  megjelenitendoLista.map((elem) => (
                    <React.Fragment key={elem.report_id}>
                      <tr className="hover:bg-gray-50 transition-all border-t">
                        <td className="px-4 py-2">{elem.report_id}</td>
                        <td className="px-4 py-2">{elem.creator_id}</td>
                        <td className="px-4 py-2">{elem.status}</td>
                        <td className="px-4 py-2">
                          {new Date(elem.created_at).toLocaleString("hu-HU", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-2">{elem.address}</td>
                        <td className="px-4 py-2">
                          <button
                            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRowExpansion(elem.report_id);
                            }}
                          >
                            {expandedRow === elem.report_id
                              ? "Bezárás"
                              : "Részletek"}
                          </button>
                        </td>
                      </tr>

                      {expandedRow === elem.report_id && (
                        <tr>
                          <td colSpan="6" className="bg-gray-50 px-6 py-4">
                            <div className="space-y-2 text-sm">
                              {elem.photo && (
                                <div>
                                  <strong>Fénykép:</strong>
                                  <br />
                                  <img
                                    src={elem.photo}
                                    alt="Macska"
                                    className="inline-block w-32 h-32 object-cover rounded"
                                  />
                                </div>
                              )}
                              <p>
                                <strong>Koordináták:</strong> {elem.lat},{" "}
                                {elem.lon}
                              </p>
                              <p>
                                <strong>Szín:</strong> {elem.color}
                              </p>
                              <p>
                                <strong>Minta:</strong> {elem.pattern}
                              </p>
                              <p>
                                <strong>Állapot:</strong> {elem.status}
                              </p>
                              <p>
                                <strong>Egészségi állapot:</strong>{" "}
                                {elem.health_status}
                              </p>
                              <p>
                                <strong>Chip szám:</strong>{" "}
                                {elem.chip_number || "—"}
                              </p>
                              <p>
                                <strong>Körülmények:</strong>{" "}
                                {elem.circumstances || "—"}
                              </p>
                              <p>
                                <strong>Egyéb ismertetőjel:</strong>{" "}
                                {elem.other_identifying_marks || "—"}
                              </p>
                              <p>
                                <strong>Példányok száma:</strong>{" "}
                                {elem.number_of_individuals || "—"}
                              </p>
                              <p>
                                <strong>Esemény dátuma:</strong>{" "}
                                {elem.disappearance_date || "—"}
                              </p>
                              <p>
                                <strong>Aktivitás:</strong>{" "}
                                {elem.activity === 1 ? "Aktív" : "Inaktív"}
                              </p>
                              <div className="flex gap-2 pt-2">
                                <button
                                  onClick={() => handleEditClick(elem)}
                                  className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                                >
                                  Módosítás
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6">
                      Nincsenek bejelentések.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
