import React, { useState, useRef, useEffect } from "react";
import useApiContext from "../contexts/ApiContext";
import MenhelyiMacskaModositasModal from "./MenhelyiMacskaModositasModal";
import BejelentesModositasModal from "./BejelentesModositasModal";

const ActionDropdown = ({ macska }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();
  const { getMacsCardMenhely } = useApiContext();
  const [showEditModal, setShowEditModal] = useState(false);

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
    console.log("Módosítás"); 
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
      {macska.status?.toLowerCase() === "m" ? (
        <MenhelyiMacskaModositasModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          macska={macska}
        />
      ) : (
        <BejelentesModositasModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          macska={macska}
        />
      )}
    </>
  );
};

export default ActionDropdown;
