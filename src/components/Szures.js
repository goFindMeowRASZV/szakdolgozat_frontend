import React, { useState } from "react";
import useApiContext from "../contexts/ApiContext";

const Szures = ({ type, onSzures }) => {
  const {
    getReportsFilter,
    getShelteredReportsFilter,
    getMacsCard,
  } = useApiContext();

  const [formData, setFormData] = useState({
    status: "",
    color: "",
    pattern: "",
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filters = {
      color: formData.color || "*",
      pattern: formData.pattern || "*",
    };

    if (type === "reports") {
      filters.status = formData.status || "*";
    }

    const isEmpty = Object.values(filters).every((val) => val === "*");

    if (isEmpty) {
      await getMacsCard();
      onSzures(null);
    } else {
      let result;
      if (type === "reports") {
        result = await getReportsFilter(filters);
      } else {
        result = await getShelteredReportsFilter(filters);
      }
      onSzures(result);
    }

    setLoading(false);
  };

  const handleClear = async () => {
    setFormData({ status: "", color: "", pattern: "" });
    await getMacsCard();
    onSzures(null);
  };

  return (
    <div >
      <form
        onSubmit={handleSubmit}
        className="szures"
      >
        {type === "reports" && (
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="select border rounded px-3 py-2 bg-white text-black shadow-sm w-full sm:max-w-xs"
          >
            <option value="">Bejelentés állapota</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        <select
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="select z-20 border rounded px-3 py-2 bg-white text-black shadow-sm w-full sm:max-w-xs"
        >
          <option value="">Cica színe</option>
          {colorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={formData.pattern}
          onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
          className="select  border rounded px-3 py-2 bg-white text-black shadow-sm w-full sm:max-w-xs"
        >
          <option value="">Cica mintája</option>
          {patternOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="gombok">

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 shadow"
          >
            Szűrés
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="border px-4 py-2 rounded text-black hover:bg-gray-100 shadow"
            title="Szűrés törlése"
          >
            ✕
          </button>
          </div>
      </form>

      {loading && <p>Betöltés...</p>}
    </div>
  );
};

export default Szures;
