import React from "react";
import useAuthContext from "../model/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Navigacio() {
    const { user, logout } = useAuthContext();

    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link className="nav-link" to="/">
                            Kezdőlap
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li className="navbar-item">
                                <button className="btn btn-dark" onClick={() => { logout() }}>
                                    Kijelentkezés
                                </button>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/bejelentes">
                                    Bejelentés
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/terkep">
                                    Térkép
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/bejelentkezes">
                                    Bejelentkezés
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/regisztracio">
                                    Regisztráció
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/bejelentes">
                                    Bejelentés
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/terkep">
                                    Térkép
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
