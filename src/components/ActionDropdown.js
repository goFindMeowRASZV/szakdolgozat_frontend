import React, { useState, useRef, useEffect } from "react";
import useApiContext from "../contexts/ApiContext";
import MenhelyiMacskaModositasModal from "./MenhelyiMacskaModositasModal";

const ActionDropdown = ({ macska }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();
  const { archiveReport, getMacsCardMenhely } = useApiContext();
  const [showEditModal, setShowEditModal] = useState(false);

  // Kattintás kívülre: bezárja a menüt
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleArchive = () => {
    archiveReport(macska.report_id);
    getMacsCardMenhely();
    setOpen(false);
  };

  const handleEdit = () => {
    console.log("Módosítás"); // csak debugra
    setShowEditModal(true);
    setOpen(false);
  };

  return (
    <>
      <div className="action-dropdown-wrapper" ref={wrapperRef}>
        <button
          className="action-dropdown-button"
          onClick={() => setOpen(!open)}
        >
          &#x22EF;
        </button>
        {open && (
          <div className="action-dropdown-menu">
            <ul>
              <li onClick={handleArchive}>Archiválás</li>
              <li onClick={handleEdit}>Módosítás</li>
            </ul>
          </div>
        )}
      </div>

      {/* ✅ Modal ide került be, így mindig renderelve van, de csak show=true-nál látszik */}
      <MenhelyiMacskaModositasModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        macska={macska}
      />
    </>
  );
};

export default ActionDropdown;
