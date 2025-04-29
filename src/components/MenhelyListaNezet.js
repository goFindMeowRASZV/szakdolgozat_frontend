import React from "react";
import "../assets/styles/MenhelyListaNezet.css";
import ActionDropdown from "./ActionDropdown";

function MenhelyListaNezet({ data, onRowClick }) {
  const [sortConfig, setSortConfig] = React.useState({
    key: "cat_id",
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortConfig.key]?.toString().toLowerCase() ?? "";
      const valB = b[sortConfig.key]?.toString().toLowerCase() ?? "";
      if (!isNaN(valA) && !isNaN(valB)) {
        return sortConfig.direction === "asc"
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const SortIcon = ({ columnKey }) => {
    const isActive = sortConfig.key === columnKey;
    const opacity = isActive ? 1 : 0.3;
    const arrow = isActive && sortConfig.direction === "desc" ? "▼" : "▲";
    return <span style={{ marginLeft: "5px", opacity }}>{arrow}</span>;
  };

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
                <th key={i} onClick={() => key && handleSort(key)} style={{ cursor: key ? "pointer" : "default" }}>
                  {label}
                  {key && <SortIcon columnKey={key} />}
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
