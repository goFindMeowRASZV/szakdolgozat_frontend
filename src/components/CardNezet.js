import React from "react";
import MacsCard from "./MacsCard.js";

export default function CardNezet({ data, onCardClick }) {
  return (
    <div className="kepek">
      {data.map((elem, index) => (
        <div
          key={index}
          onClick={() => onCardClick(elem)}
          style={{ cursor: "pointer" }}
        >
          <MacsCard adat={elem} index={index} />
        </div>
      ))}
    </div>
  );
}
