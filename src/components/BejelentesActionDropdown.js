import React, { useState, useRef, useEffect } from "react";
import BejelentesModositasModal from "./BejelentesModositasModal";

const BejelentesActionDropdown = ({ report }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();
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

  const handleEdit = () => {
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
              <li onClick={handleEdit}>Módosítás</li>
            </ul>
          </div>
        )}
      </div>

      <BejelentesModositasModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        report={report}
      />
    </>
  );
};

export default BejelentesActionDropdown;
