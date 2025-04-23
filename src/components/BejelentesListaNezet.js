import React from "react";
import BejelentesActionDropdown from "./BejelentesActionDropdown";
import "../assets/styles/MenhelyListaNezet.css";

export default function BejelentesListaNezet({
  data,
  expandedRow,
  toggleRowExpansion,
  onRowClick,
  onEditClick,
}) {
  return (
    <div className="menhely-lista-container">
      <table className="menhely-lista-table">
        <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
          <tr>
            <th>Kép</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Bejelentő</th>
            <th className="px-4 py-2">Státusz</th>
            <th className="px-4 py-2">Létrehozva</th>
            <th className="px-4 py-2">Cím</th>
            <th className="px-4 py-2">További adatok</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {data?.length ? (
            data.map((elem) => (
              <React.Fragment key={elem.report_id}>
                <tr
                  className="hover:bg-gray-50 transition-all border-t"
                  onClick={() => onRowClick(elem)}
                >
                  <td>
                    {elem.photo ? (
                      <img
                        src={elem.photo}
                        alt="cica"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "12px", color: "#888" }}>
                        Nincs kép
                      </span>
                    )}
                  </td>

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
                  <td
                    className="px-4 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                      onClick={() => toggleRowExpansion(elem.report_id)}
                    >
                      {expandedRow === elem.report_id ? "Bezárás" : "Részletek"}
                    </button>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <BejelentesActionDropdown report={elem} />
                  </td>
                </tr>

                {expandedRow === elem.report_id && (
                  <tr>
                    <td colSpan="100%" className="bg-gray-50 px-6 py-4">
                      <div className="space-y-2 text-sm">
                    
                        <p>
                          <strong>Koordináták:</strong> {elem.lat}, {elem.lon}
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
                          <strong>Chip szám:</strong> {elem.chip_number || "—"}
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
                            onClick={() => onEditClick(elem)}
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
  );
}
