import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import useApiContext from "../contexts/ApiContext";
import SzuresModal from "./SzuresModal";
import "../assets/styles/SzuresKereses.css";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 820);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 820);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (data) => {
    setLoading(true);

    const filters = {
      color: data.color || "*",
      pattern: data.pattern || "*",
    };

    if (type === "reports") {
      filters.status = data.status || "*";
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
    setIsOpen(false);
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    if (isMobile) {
      setIsModalOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div className="filter-bar-wrapper">
        <button
          onClick={handleButtonClick}
          className="filter-toggle-btn"
          title="Szűrő megnyitása"
        >
          <Filter size={20} />
        </button>

        {!isMobile && (
          <div className={`filter-panel-horizontal ${isOpen ? "open" : ""}`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formData);
                setIsOpen(false);
              }}
              className="flex items-center gap-2"
            >
              {type === "reports" && (
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="select"
                >
                  <option value="">Állapot</option>
                  {["t", "k", "l"].map((v) => (
                    <option key={v} value={v}>
                      {v === "t" ? "Talált" : v === "k" ? "Keresett" : "Látott"}
                    </option>
                  ))}
                </select>
              )}

              <select
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="select"
              >
                <option value="">Szín</option>
                <option value="feher">Fehér</option>
                <option value="fekete">Fekete</option>
                <option value="barna">Barna</option>
                <option value="voros">Vörös</option>
                <option value="bezs">Bézs</option>
                <option value="szurke">Szürke</option>
                <option value="feketefeher">Fekete-fehér</option>
                <option value="feketefehervoros">Fekete-fehér-vörös</option>
                <option value="feketevoros">Fekete-vörös</option>
                <option value="vorosfeher">Vörös-fehér</option>
                <option value="szurkefeher">Szürke-fehér</option>
                <option value="barnafeher">Barna-fehér</option>
                <option value="barnabezs">Barna-bézs</option>
                <option value="egyeb">Egyéb</option>
              </select>

              <select
                value={formData.pattern}
                onChange={(e) =>
                  setFormData({ ...formData, pattern: e.target.value })
                }
                className="select"
              >
                <option value="">Minta</option>
                <option value="cirmos">Cirmos</option>
                <option value="foltos">Foltos</option>
                <option value="egyszinu">Egyszínű</option>
                <option value="teknoctarka">Teknőctarka</option>
                <option value="kopasz">Kopasz</option>
                <option value="foka">Fóka</option>
                <option value="kaliko">Kalikó</option>
              </select>

              <button type="submit" className="bg-black text-white px-3 py-1 rounded">
                Szűrés
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="border border-black px-3 py-1 rounded"
              >
                ✕
              </button>
            </form>
          </div>
        )}
      </div>

      {isMobile && (
        <SzuresModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSzures={(data) => {
            setFormData(data);
            handleSubmit(data);
          }}
          onClear={handleClear}
          type={type}
        />
      )}
    </>
  );
};

export default Szures;
