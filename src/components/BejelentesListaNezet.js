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
    <div className="table-wrapper">
      <div className="menhely-lista-container">
        <table className="menhely-lista-table">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
            <tr>
              <th>Kép</th>
              <th>ID</th>
              <th>Bejelentő</th>
              <th>Státusz</th>
              <th>Létrehozva</th>
              <th>Cím</th>
              <th>Koordináták</th>
              <th>Szín</th>
              <th>Minta</th>
              <th>Egészségi állapot</th>
              <th>Chip szám</th>
              <th>Körülmények</th>
              <th>Egyéb ismertetőjel</th>
              <th>Példányok száma</th>
              <th>Esemény dátuma</th>
              <th>Aktivitás</th>
              <th> </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {data?.length ? (
              data.map((elem) => (
                <tr
                  key={elem.report_id}
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
                  <td className="px-4 py-2">
                    {elem.lat}, {elem.lon}
                  </td>
                  <td className="px-4 py-2">{elem.color}</td>
                  <td className="px-4 py-2">{elem.pattern}</td>
                  <td className="px-4 py-2">{elem.health_status}</td>
                  <td className="px-4 py-2">{elem.chip_number || "—"}</td>
                  <td className="px-4 py-2">{elem.circumstances || "—"}</td>
                  <td className="px-4 py-2">
                    {elem.other_identifying_marks || "—"}
                  </td>
                  <td className="px-4 py-2">
                    {elem.number_of_individuals || "—"}
                  </td>
                  <td className="px-4 py-2">
                    {elem.disappearance_date || "—"}
                  </td>
                  <td className="px-4 py-2">
                    {elem.activity === 1 ? "Aktív" : "Inaktív"}
                  </td>
                  <td
                    className="px-4 py-2 flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BejelentesActionDropdown report={elem} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%" className="text-center py-6">
                  Nincsenek bejelentések.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
