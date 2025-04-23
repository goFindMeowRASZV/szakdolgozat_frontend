import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import "../Auth.css";

export default function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adat = {
      email: email,
      password: password,
    };
    console.log(adat);

    loginReg(adat, "/login");
  };

  return (
    <div className="bejelentkezesHatter">
    <div className="bejelentkezes m-auto" style={{ maxWidth: "400px", paddingTop:'60px' ,paddingBottom:'60px'}}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            id="email"
            placeholder="email"
            name="email"
          />
        </div>
        <div>
          {errors.email && (
            <span className="text-danger">{errors.email[0]}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Jelszó:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            id="pwd"
            placeholder="jelszó"
            name="pwd"
          />
          <div>
            {errors.password && (
              <span className="text-danger">{errors.password[0]}</span>
            )}
          </div>
        </div>

        <div className=" text-center">
          <button type="submit" className="btn btn-dark w-100">
            Bejelentkezés
          </button>

          <p>
            Még nincs felhaszálóneve?
            <Link className="nav-link text-info" to="/regisztracio">
              Regisztráció
            </Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}

