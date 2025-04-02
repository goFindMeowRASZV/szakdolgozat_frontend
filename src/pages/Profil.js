import React, { useState, useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

function Profil() {
  const { user, uploadProfilePicture, changePassword } = useAuthContext();

  const [selectedFile, setSelectedFile] = useState(null);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Nincs kiválasztott fájl.");
      return;
    }
    uploadProfilePicture(selectedFile);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      toast.error("Az új jelszavak nem egyeznek.");
      return;
    }
    changePassword(passwordData);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  if (!user) {
    return <div>Betöltés...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        <div className="bejelentkezettProfilKepElem">
          {user.profile_picture ? (
            <img
              className="profilKep"
              src={`http://localhost:8000${user.profile_picture}`}
              alt="Profilkép"
            />
          ) : (
            <img className="profilKep" src="images/user.jpg" alt="profkep" />
          )}
        </div>
        <div>
          <p>
            <strong>Név:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Regisztráció dátuma:</strong> {user.created_at}
          </p>
        </div>
      </div>

      <form onSubmit={handleUpload} style={{ marginTop: "20px" }}>
        <h3>Profilkép módosítása</h3>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Feltöltés</button>
      </form>

      <form onSubmit={handlePasswordChange} style={{ marginTop: "20px" }}>
        <h3>Jelszó módosítása</h3>
        <input
          type="password"
          name="current_password"
          placeholder="Jelenlegi jelszó"
          value={passwordData.current_password}
          onChange={handlePasswordInputChange}
          required
        />
        <input
          type="password"
          name="new_password"
          placeholder="Új jelszó"
          value={passwordData.new_password}
          onChange={handlePasswordInputChange}
          required
        />
        <input
          type="password"
          name="new_password_confirmation"
          placeholder="Új jelszó megerősítése"
          value={passwordData.new_password_confirmation}
          onChange={handlePasswordInputChange}
          required
        />
        <button type="submit">Jelszó frissítése</button>
      </form>
    </div>
  );
}

export default Profil;
