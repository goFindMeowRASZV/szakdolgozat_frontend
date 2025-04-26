import React, { useState } from "react";
import "../assets/styles/SzuresKereses.css";

export default function SzuresModal({
  isOpen,
  onClose,
  onSzures,
  type,
  onClear,
}) {
  const [formData, setFormData] = useState({
    status: "",
    color: "",
    pattern: "",
  });

  const statusOptions = [
    { label: "Talált", value: "t" },
    { label: "Keresett", value: "k" },
    { label: "Látott", value: "l" },
  ];

  const colorOptions = [
    { label: "Fehér", value: "feher" },
    { label: "Fekete", value: "fekete" },
    { label: "Barna", value: "barna" },
    { label: "Vörös", value: "voros" },
    { label: "Bézs", value: "bezs" },
    { label: "Szürke", value: "szurke" },
    { label: "Fekete-fehér", value: "feketefeher" },
    { label: "Fekete-fehér-vörös", value: "feketefehervoros" },
    { label: "Fekete-vörös", value: "feketevoros" },
    { label: "Vörös-fehér", value: "vorosfeher" },
    { label: "Szürke-fehér", value: "szurkefeher" },
    { label: "Barna-fehér", value: "barnafeher" },
    { label: "Barna-bézs", value: "barnabezs" },
    { label: "Egyéb", value: "egyeb" },
  ];

  const patternOptions = [
    { label: "Cirmos", value: "cirmos" },
    { label: "Foltos", value: "foltos" },
    { label: "Egyszínű", value: "egyszinu" },
    { label: "Teknőctarka", value: "teknoctarka" },
    { label: "Kopasz", value: "kopasz" },
    { label: "Fóka", value: "foka" },
    { label: "Kalikó", value: "kaliko" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSzures(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Szűrés</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          {type === "reports" && (
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="">Állapot</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          <select
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
          >
            <option value="">Szín</option>
            {colorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={formData.pattern}
            onChange={(e) =>
              setFormData({ ...formData, pattern: e.target.value })
            }
          >
            <option value="">Minta</option>
            {patternOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="modal-buttons">
            <button
              type="button"
              className="border px-3 py-2 rounded"
              onClick={() => {
                setFormData({ status: "", color: "", pattern: "" });
              }}
            >
              Törlés
            </button>
            <button
              type="button"
              className="border px-3 py-2 rounded"
              onClick={() => {
                onClose();
              }}
            >
              Mégse
            </button>
            <button
              type="submit"
              className="bg-black text-white px-3 py-2 rounded"
            >
              Szűrés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
