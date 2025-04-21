import React, { useState, useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
import useApiContext from "../contexts/ApiContext";
import { toast } from "react-toastify";

function Profil() {
  const { user, uploadProfilePicture, changePassword } = useAuthContext();
  const { aktualisFelhasznalo, setAktualisFelhasznalo } = useApiContext();

  const [profilData, setProfilData] = useState(user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [currentPasswordError, setCurrentPasswordError] = useState(null);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // Frissítjük a belső profil adatokat, ha változik az aktuális felhasználó vagy a bejelentkezett user
  useEffect(() => {
    if (aktualisFelhasznalo?.id === user.id) {
      setAktualisFelhasznalo(null);
    }
    setProfilData(aktualisFelhasznalo || user);
  }, [aktualisFelhasznalo, user, setAktualisFelhasznalo]);

  const isSajatProfil = !aktualisFelhasznalo || aktualisFelhasznalo.id === user.id;

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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setCurrentPasswordError(null);

    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      setPasswordMatch(false);
      return;
    }

    try {
      await changePassword(passwordData);
      toast.success("A jelszó sikeresen frissítve!");
    } catch (error) {
      if (error.code === "INVALID_CURRENT_PASSWORD") {
        toast.error("❗ A jelenlegi jelszó hibás.");
      } else {
        toast.error("Hiba történt a jelszó frissítésekor.");
      }
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...passwordData, [name]: value };

    setPasswordData(updatedData);

    if (name === "new_password") {
      setIsPasswordValid(value.length >= 8);
      setPasswordMatch(updatedData.new_password_confirmation === value);
    }

    if (name === "new_password_confirmation") {
      setPasswordMatch(updatedData.new_password === value);
    }
  };

  if (!profilData) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="profilContainer">
      <div className="profilAdatok">
        <div className="bejelentkezettProfilKepElem">
          {profilData.profile_picture ? (
            <img
              className="profilKep"
              src={
                profilData.profile_picture.startsWith("http")
                  ? profilData.profile_picture
                  : `http://localhost:8000${profilData.profile_picture}`
              }
              alt="Profilkép"
            />
          ) : (
            <img className="profilKep" src="/images/user.jpg" alt="profkep" />
          )}
        </div>
        <div className="profilInfo">
          <p>
            <strong>Név:</strong> {profilData.name}
          </p>
          <p>
            <strong>Email:</strong> {profilData.email}
          </p>
          <p>
            <strong>Regisztráció dátuma:</strong>{" "}
            {new Date(profilData.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {isSajatProfil && (
        <>
          <form onSubmit={handleUpload} className="profilForm">
            <h3>Profilkép módosítása</h3>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Feltöltés</button>
          </form>

          <form onSubmit={handlePasswordChange} className="profilForm">
            <h3>Jelszó módosítása</h3>

            <input
              type="password"
              name="current_password"
              placeholder="Jelenlegi jelszó"
              value={passwordData.current_password}
              onChange={handlePasswordInputChange}
              required
            />
            {currentPasswordError && (
              <small
                style={{
                  color: "red",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                {currentPasswordError}
              </small>
            )}

            <input
              type="password"
              name="new_password"
              placeholder="Új jelszó"
              value={passwordData.new_password}
              onChange={handlePasswordInputChange}
              required
            />
            {passwordData.new_password.length > 0 && (
              <small
                style={{
                  color: isPasswordValid ? "green" : "red",
                  marginBottom: "10px",
                  display: "block",
                }}
              >
                {isPasswordValid
                  ? "✅ Az új jelszó megfelelő."
                  : "❗ Az új jelszónak legalább 8 karakter hosszúnak kell lennie."}
              </small>
            )}

            <input
              type="password"
              name="new_password_confirmation"
              placeholder="Új jelszó megerősítése"
              value={passwordData.new_password_confirmation}
              onChange={handlePasswordInputChange}
              required
            />
            {passwordData.new_password_confirmation.length > 0 && (
              <small
                style={{
                  color: passwordMatch ? "green" : "red",
                  marginBottom: "10px",
                  display: "block",
                }}
              >
                {passwordMatch
                  ? "✅ A jelszavak egyeznek."
                  : "❗ A megerősített jelszó nem egyezik az új jelszóval."}
              </small>
            )}

            <button type="submit">Jelszó frissítése</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Profil;
