import React from "react";
import useAuthContext from "../model/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Navigacio() {
    const { user, logout } = useAuthContext();
    const isHomePage = Location.pathname === "/kezdolap2";

    return (
        <nav 
        className="navbar-expand-sm"
        style={isHomePage ? { background: "transparent" } : {
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/NavHatter.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}
    >
            <div className="container-fluid" style={{ width:'100%', padding: '0' , height:'39px',   borderBottom: '1px solid white',marginBottom:'1px', position:'relative', zIndex:'1'}}>
                <ul className="menu navbar-nav w-100" style={{ height:'39px'}}>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/kezdolap2">
                            Kezdőlap
                        </Link>
                    </li>
                    {user ? (
                        <>
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
                            <li className="navbar-item">
                                <Link className="nav-link" to="/bejelentesek">
                                    Bejelentések
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/menhely">
                                    Menhely
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/profil">
                                    Profilom
                                </Link>
                            </li>
                            <li className="logOut navbar-item">
                                <Link className="nav-link" to="/kezdolap2" onClick={() => { logout() }}>
                                    Kijelentkezés
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
                                <Link className="nav-link" to="/bejelentesek">
                                    Bejelentések
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/menhely">
                                    Menhely
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
                    }
