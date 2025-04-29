import React from "react";
import BejelentesActionDropdown from "./BejelentesActionDropdown";
import "../assets/styles/MenhelyListaNezet.css";
import useSortableTable from "./UseSortTable";

export default function BejelentesListaNezet({
  data,
  expandedRow,
  toggleRowExpansion,
  onRowClick,
  onEditClick,
}) {
  const { sortedData, handleSort, getSortIcon } = useSortableTable(data, "created_at");

  const headers = [
    { label: "Kép", key: null },
    { label: "ID", key: "report_id" },
    { label: "Bejelentő", key: "creator_id" },
    { label: "Státusz", key: "status" },
    { label: "Létrehozva", key: "created_at" },
    { label: "Cím", key: "address" },
    { label: "Koordináták", key: "lat" },
    { label: "Szín", key: "color" },
    { label: "Minta", key: "pattern" },
    { label: "Egészségi állapot", key: "health_status" },
    { label: "Chip szám", key: "chip_number" },
    { label: "Körülmények", key: "circumstances" },
    { label: "Egyéb ismertetőjel", key: "other_identifying_marks" },
    { label: "Példányok száma", key: "number_of_individuals" },
    { label: "Esemény dátuma", key: "event_date" },
    { label: "Aktivitás", key: "activity" },
    { label: "", key: null },
  ];

  return (
    <div className="table-wrapper">
      <div className="menhely-lista-container">
        <table className="menhely-lista-table">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
            <tr>
              {headers.map(({ label, key }, idx) => (
                <th
                  key={idx}
                  onClick={() => key && handleSort(key)}
                  style={{ cursor: key ? "pointer" : "default" }}
                >
                  {label}
                  {key && getSortIcon(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {sortedData?.length ? (
              sortedData.map((elem) => (
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
                  <td>{elem.report_id}</td>
                  <td>{elem.creator_id}</td>
                  <td>{elem.status}</td>
                  <td>
                    {new Date(elem.created_at).toLocaleString("hu-HU", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{elem.address}</td>
                  <td>{elem.lat}, {elem.lon}</td>
                  <td>{elem.color}</td>
                  <td>{elem.pattern}</td>
                  <td>{elem.health_status}</td>
                  <td>{elem.chip_number || "—"}</td>
                  <td>{elem.circumstances || "—"}</td>
                  <td>{elem.other_identifying_marks || "—"}</td>
                  <td>{elem.number_of_individuals || "—"}</td>
                  <td>{elem.event_date || "—"}</td>
                  <td>{elem.activity === 1 ? "Aktív" : "Inaktív"}</td>
                  <td onClick={(e) => e.stopPropagation()}>
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
