import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Regisztracio() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(null);

  const navigate = useNavigate();
  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setIsPasswordValid(false);
      return;
    }

    if (password !== password_confirmation) {
      setPasswordMatch(false);
      return;
    }

    const adat = {
      name,
      email,
      password,
      password_confirmation,
    };

    loginReg(adat, "/register");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(value.length >= 8);
    setPasswordMatch(value === password_confirmation);
  };

  const handlePasswordConfirmationChange = (e) => {
    const value = e.target.value;
    setPasswordConfirmation(value);
    setPasswordMatch(password === value);
  };

  return (
    <div className="regisztracioHatter">
      <div className="m-auto" style={{ maxWidth: "400px", paddingTop: "15px", paddingBottom: "30px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">Név:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="name"
              placeholder="Név"
              name="name"
            />
            {errors.name && <span className="text-danger">{errors.name[0]}</span>}
          </div>

          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="Email"
              name="email"
            />
            {errors.email && <span className="text-danger">{errors.email[0]}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">Jelszó:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
              id="pwd"
              placeholder="Jelszó"
              name="pwd"
            />
            {isPasswordValid !== null && (
              <small style={{ color: "#fff", display: "block", marginBottom: "8px" }}>
                <span style={{ color: isPasswordValid ? "lightgreen" : "red" }}>
                  {isPasswordValid ? "✅" : "❗"}
                </span>{" "}
                A jelszónak legalább 8 karakter hosszúnak kell lennie.
              </small>
            )}
            {errors.password && <span className="text-danger">{errors.password[0]}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="pwd2" className="form-label">Jelszó újra:</label>
            <input
              type="password"
              value={password_confirmation}
              onChange={handlePasswordConfirmationChange}
              className="form-control"
              id="pwd2"
              placeholder="Jelszó újra"
              name="pwd2"
            />
            {password_confirmation.length > 0 && (
              <small style={{ color: "#fff", display: "block", marginBottom: "8px" }}>
                <span style={{ color: passwordMatch ? "lightgreen" : "red" }}>
                  {passwordMatch ? "✅" : "❗"}
                </span>{" "}
                {passwordMatch
                  ? "A jelszavak egyeznek."
                  : "A jelszavak nem egyeznek."}
              </small>
            )}
            {errors.password_confirmation && (
              <span className="text-danger">{errors.password_confirmation[0]}</span>
            )}
          </div>

          <button type="submit" className="btn btn-dark w-100">Regisztrálok</button>
        </form>
      </div>
    </div>
  );
}
