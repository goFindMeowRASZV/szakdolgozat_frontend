import React, { useState, useRef, useEffect } from "react";
import useApiContext from "../contexts/ApiContext";

const ActionDropdown = ({ reportId }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();
  const { archiveReport, getMacsCardMenhely } = useApiContext();

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
    archiveReport(reportId);
    getMacsCardMenhely();
    setOpen(false); // Menü bezárása
  };

  const handleEdit = () => {
    console.log("Módosítás"); // Jövőbeli funkció
    setOpen(false);
  };

  return (
    <div className="action-dropdown-wrapper" ref={wrapperRef}>
      <button className="action-dropdown-button" onClick={() => setOpen(!open)}>
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
  );
};

export default ActionDropdown;
