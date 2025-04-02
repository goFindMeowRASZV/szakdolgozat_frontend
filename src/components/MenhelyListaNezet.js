import React from "react";
import "../MenhelyListaNezet.css";
import ActionDropdown from "./ActionDropdown";

function MenhelyListaNezet({ data, onRowClick }) {
  return (
    <div className="menhely-lista-container">
      <table className="menhely-lista-table">
        <thead>
          <tr>
            <th>Kép</th>
            <th>Státusz</th>
            <th>Aktív</th>
            <th>Cím</th>
            <th>Szín</th>
            <th>Minta</th>
            <th>Ismertetőjel</th>
            <th>Egészség</th>
            <th>Chip</th>
            <th>Körülmények</th>
            <th>Példány</th>
            <th>Dátum</th>
            <th>Egyéb</th>
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
              <td>{macska.status?.toUpperCase()}</td>
              <td>{macska.activity === 1 ? "Igen" : "Nem"}</td>
              <td>{macska.address}</td>
              <td>{macska.color}</td>
              <td>{macska.pattern}</td>
              <td>{macska.other_identifying_marks || "-"}</td>
              <td>{macska.health_status || "-"}</td>
              <td>{macska.chip_number || "-"}</td>
              <td>{macska.circumstances || "-"}</td>
              <td>{macska.number_of_individuals || 1}</td>
              <td>{macska.disappearance_date || "-"}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <ActionDropdown reportId={macska.report_id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenhelyListaNezet;
