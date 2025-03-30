import React, { useState, useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";

  
function Profil() {
  const { user } = useAuthContext();

return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "1000px", margin: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", width: "100%" }}>
        <div className="bejelentkezettProfilKepElem">
            {user ? (  <img className="profilKep" src={user.profile_picture} alt={user.profile_picture} />) 
            : (  <img className="profilKep" src="images/user.jpg" alt="profkep" />)}
        </div>
        <div>
          <p><strong>Név:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Regisztráció dátuma:</strong> {user.created_at}</p>
        </div>
      </div>
    </div>
  );
};

export default Profil;
