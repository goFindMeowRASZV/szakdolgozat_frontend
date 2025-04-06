import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import useApiContext from "../contexts/ApiContext";
import Szures from "../components/Szures";
import MacsCard from "../components/MacsCard";
import BejelentesMenhelyModal from "../components/BejelentesMenhelyModal";
import { myAxios } from "../contexts/MyAxios";

function Bejelentesek() {
  const { user } = useAuthContext();
  const { macskaLISTA, getMacsCard, archiveReport, setAktualisMacska } =
    useApiContext();
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role !== undefined) getMacsCard(user.role);
    };
    fetchData();
  }, []);

  const handleCardClick = (elem) => {
    setAktualisMacska(elem);
    navigate("/MacskaProfil");
  };

  const toggleRowExpansion = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleArchiveClick = (id) => {
    archiveReport(id);
    setExpandedRow(null);
  };

  const handleUpdateClick = (elem) => {
    setEditData(elem);
  };

  return (
    <div className="px-4 pb-8">
      {user?.role === 2 && <Szures type="reports" />}
      <h1 className="text-2xl font-bold text-center my-8">Bejelentések</h1>

      {user && user.role === 2 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {macskaLISTA?.length ? (
            macskaLISTA.map((elem, index) => (
              <div key={index} onClick={() => handleCardClick(elem)}>
                <MacsCard adat={elem} />
              </div>
            ))
          ) : (
            <p>Betöltés...</p>
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
              {macskaLISTA?.length ? (
                macskaLISTA.map((elem) => (
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
                                onClick={() =>
                                  handleArchiveClick(elem.report_id)
                                }
                                className="bg-black-400 text-white px-3 py-1 rounded"
                              >
                                Archiválás
                              </button>
                              <button
                                onClick={() => handleUpdateClick(elem)}
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

      {editData && (
        <BejelentesMenhelyModal
          onClose={() => setEditData(null)}
          onSave={() => {
            getMacsCard();
            setEditData(null);
          }}
          initialData={editData}
          isShelterPage={false}
        />
      )}
    </div>
  );
}

export default Bejelentesek;
