import React from "react";
import "../assets/styles/MenhelyListaNezet.css";
import ActionDropdown from "./ActionDropdown";
import useSortableTable from "./UseSortTable";

function MenhelyListaNezet({ data, onRowClick }) {
  const { sortedData, handleSort, getSortIcon } = useSortableTable(data, "cat_id");

  const headers = [
    { label: "Kép", key: null },
    { label: "Macska ID", key: "cat_id" },
    { label: "Mentő", key: "rescuer" },
    { label: "Bejelentés ID", key: "report" },
    { label: "Gazdi", key: "owner" },
    { label: "Behozatal", key: "created_at" },
    { label: "Kikerülés", key: "adoption_date" },
    { label: "Kennel", key: "kennel_number" },
    { label: "Kórlap", key: "medical_record" },
    { label: "Státusz", key: "s_status" },
    { label: "Chip", key: "chip_number" },
    { label: "Fajta", key: "breed" },
    { label: "", key: null },
  ];

  return (
    <div className="table-wrapper">
      <div className="menhely-lista-container">
        <table className="menhely-lista-table">
          <thead>
            <tr>
              {headers.map(({ label, key }, i) => (
                <th
                  key={i}
                  onClick={() => key && handleSort(key)}
                  style={{ cursor: key ? "pointer" : "default" }}
                >
                  {label}
                  {key && getSortIcon(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((macska, index) => (
              <tr key={index} onClick={() => onRowClick(macska)}>
                <td>
                  <img
                    src={macska.photo}
                    alt="cica"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </td>
                <td>{macska.cat_id}</td>
                <td>{macska.rescuer}</td>
                <td>{macska.report}</td>
                <td>{macska.owner || "-"}</td>
                <td>{macska.created_at}</td>
                <td>{macska.adoption_date || "-"}</td>
                <td>{macska.kennel_number || "-"}</td>
                <td>{macska.medical_record || "-"}</td>
                <td>{macska.s_status?.toUpperCase()}</td>
                <td>{macska.chip_number || "-"}</td>
                <td>{macska.breed || "-"}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <ActionDropdown macska={macska} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MenhelyListaNezet;
