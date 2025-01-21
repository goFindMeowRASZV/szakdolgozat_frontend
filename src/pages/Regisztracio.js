import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuthContext from "../model/contexts/AuthContext";

export default function Regisztracio() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Összegyűjtjük egyetlen objektumban az űrlap adatokat
    const adat = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    console.log(adat);
    loginReg(adat, "/register");
  };

  return (
    <div className=" m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Regisztráció</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">
            Név:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control"
            id="name"
            placeholder="Név"
            name="name"
          />
          <div>
            {errors.name && (
              <span className="text-danger">{errors.name[0]}</span>
            )}
          </div>
        </div>
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
          <div>
            {errors.email && (
              <span className="text-danger">{errors.email[0]}</span>
            )}
          </div>
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
        <div className="mb-3">
          <label htmlFor="pwd2" className="form-label">
            Jelszó újra:
          </label>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
            className="form-control"
            id="pwd2"
            placeholder="jelszó újra"
            name="pwd2"
          />
          <div>
            {errors.password_confirmation && (
              <span className="text-danger">
                {errors.password_confirmation[0]}
              </span>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Regisztrálok
        </button>
      </form>
    </div>
  );
}

/* import React, {useState, useContext} from 'react'
import AuthContext from '../model/contexts/AuthContext';

function Regisztracio() {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [password_confirmation, setPassword_confirmation]=useState("");
    const {regisztracio_fv}=useContext(AuthContext)

    function handleSubmit(e){
        e.preventDefault();
        console.log("katt");
        const adat={
            name:name,
            email:email,
            password:password,
            password_confirmation:password_confirmation

        }
        console.log(adat);
        regisztracio_fv(adat)
    }

    return (
        <div className="m-auto" style={{maxWidth: "400px"}}>
            <h1 className="text-center">Regisztráció</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">Név</label>
          <input type="text" className="form-control" id="name" placeholder="Név"value={name} onChange={(e)=>{setName(e.target.value)}}>
         </input>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}>
         </input>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password" className="form-label">Jelszó</label>
          <input type="password" className="form-control" id="password" placeholder="Jelszó" value={password} onChange={(e)=>{setPassword(e.target.value)}}>
         </input>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password" className="form-label">Jelszó újra</label>
          <input type="password" className="form-control" id="password" placeholder="Jelszó" value={password_confirmation} onChange={(e)=>{setPassword_confirmation(e.target.value)}}>
         </input>
        </div>
        <button type="submit" class="btn btn-dark">Regisztrálok</button>
        </form>
        </div>
    )
}

export default Regisztracio */