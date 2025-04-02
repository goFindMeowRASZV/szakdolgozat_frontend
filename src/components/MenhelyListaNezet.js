import React from "react";
import "../MenhelyListaNezet.css";

export default function MenhelyListaNezet({ data, onRowClick }) {
  return (
    <div className="list-view-container">
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Kép</th>
            <th>Cím</th>
            <th>Szín</th>
            <th>Minta</th>
            <th>Státusz</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, index) => (
            <tr key={index} onClick={() => onRowClick(elem)} style={{ cursor: "pointer" }}>
              <td>
                <img
                  src={elem.photo}
                  alt="Macska"
                  style={{ width: "60px", height: "auto" }}
                />
              </td>
              <td>{elem.address}</td>
              <td>{elem.color}</td>
              <td>{elem.pattern}</td>
              <td>{elem.status.toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
