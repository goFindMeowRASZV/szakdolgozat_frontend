import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext.js";
import useApiContext from "../contexts/ApiContext.js";
import Szures from "../components/Szures.js";
import MacsCard from "../components/MacsCard.js";
import { myAxios } from "../contexts/MyAxios.js";

function Bejelentesek() {
  const {user} =
    useAuthContext();
    const { macskaLISTA, getMacsCard, archiveReport, updateReport } =
    useApiContext();
  const navigate = useNavigate();
  const { setAktualisMacska } = useAuthContext();
  const [expandedRow, setExpandedRow] = useState(null); // Lenyíló állapot
  const [editData, setEditData] = useState(null); // Módosítási állapot

  useEffect(() => {
    myAxios.get("/sanctum/csrf-cookie").then(() => {
      getMacsCard(user.role);
    });
  }, []);

  const handleCardClick = (elem) => {
    setAktualisMacska(elem);
    navigate(`/MacskaProfil`);
  };

  const toggleRowExpansion = (report_id) => {
    if (expandedRow === report_id) {
      setExpandedRow(null); // Bezárja a már nyitott panelt
    } else {
      setExpandedRow(report_id); // Kinyitja a panelt
    }
  };

  const handleArchiveClick = (report_id) => {
    archiveReport(report_id); // Archiválás hívás
    setExpandedRow(null); // Bezárja a lenyíló panelt
  };

  const handleUpdateClick = (elem) => {
    setEditData(elem); // Módosítási állapot beállítása
  };

  return (
    <div className="galeriaBody">
      <Szures type="reports" />
      <h1 className="galeriaCim" style={{ paddingTop: "60px" }}>
        BEJELENTÉSEK
      </h1>
      {user && user.role === 2 ? (
        <div className="kepek">
          {macskaLISTA && macskaLISTA.length > 0 ? (
            macskaLISTA.map((elem, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(elem)}
                style={{ cursor: "pointer" }}
              >
                <MacsCard adat={elem} />
              </div>
            ))
          ) : (
            <p>Betöltés...</p>
          )}
        </div>
      ) : (
        <table className="macskaTabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Bejelentő</th>
              <th>Státusz</th>
              <th>Létrehozva</th>
              <th>Cím</th>
              <th>További adatok</th>
            </tr>
          </thead>
          <tbody>
            {macskaLISTA && macskaLISTA.length > 0 ? (
              macskaLISTA.map((elem, index) => (
                <React.Fragment key={index}>
                  <tr
                    style={{ cursor: "pointer" }}
                  >
                    <td>{elem.report_id}</td>
                    <td>{elem.creator_id}</td>
                    <td>{elem.status}</td>
                    <td>{new Date(elem.created_at).toLocaleString("hu-HU", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                    <td>{elem.address}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Ne zárja be a sort
                          toggleRowExpansion(elem.report_id);
                        }}
                      >
                        {expandedRow === elem.report_id
                          ? "Bezárás"
                          : "További adatok"}
                      </button>
                    </td>
                  </tr>

                  {/* Lenyíló panel, amely az összes adatot tartalmazza */}
                  {expandedRow === elem.report_id && (
                    <tr>
                      <td colSpan="6">
                        <div className="expanded-row">
                          <p><strong>Koordináták:</strong> {elem.lat}, {elem.lon}</p>
                          <p><strong>Fénykép:</strong> <img src={elem.photo} alt="Macska" style={{ width: '50px', height: '50px' }} /></p>
                          <p><strong>Szín:</strong> {elem.color}</p>
                          <p><strong>Minta:</strong> {elem.pattern}</p>
                          <p><strong>Egyéb azonosítók:</strong> {elem.other_identifying_marks}</p>
                          <p><strong>Egészségi állapot:</strong> {elem.health_status}</p>
                          <p><strong>Chip szám:</strong> {elem.chip_number}</p>
                          <p><strong>Körülmények:</strong> {elem.circumstances}</p>
                          <p><strong>Egyedek száma:</strong> {elem.number_of_individuals}</p>
                          <p><strong>Eltűnés dátuma:</strong> {elem.disappearance_date}</p>
                          <p><strong>Aktivitás:</strong> {elem.activity === 1 ? "Aktív" : "Inaktív"}</p>
                          <div>
                            <button onClick={() => handleArchiveClick(elem.report_id)}>Archiválás</button>
                            <button onClick={() => handleUpdateClick(elem)}>Módosítás</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6">Betöltés...</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bejelentesek;
