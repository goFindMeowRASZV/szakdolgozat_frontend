import React from "react";
import "../assets/styles/MenhelyListaNezet.css";
import ActionDropdown from "./ActionDropdown";

function MenhelyListaNezet({ data, onRowClick }) {
  return (
    <div className="menhely-lista-container">
      <table className="menhely-lista-table">
        <thead>
          <tr>
          <th>Kép</th>
          <th>Macska ID</th>
          <th>Mentő</th>
          <th>Bejelentés ID</th>
          <th>Gazdi</th>
          <th>Behozatal</th>
          <th>Kikerülés</th>
          <th>Kennel</th>
          <th>Kórlap</th>
          <th>Státusz</th>
          <th>Chip</th>
          <th>Fajta</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((macska, index) => (
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
  );
}

export default MenhelyListaNezet;
