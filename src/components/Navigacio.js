import React, { useState, useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
import useApiContext from "../contexts/ApiContext";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/NavBar.css";

export default function Navigacio() {
  const { user, logout } = useAuthContext();
  const { setAktualisFelhasznalo } = useApiContext();
  const location = useLocation();
  const isHomePage = location.pathname === "/kezdolap2";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 785);
    };
    checkIsMobile();
    setReady(true);
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }
  }, [menuOpen, isMobile]);

  const handleLinkClick = () => {
    if (isMobile) setMenuOpen(false);
  };

  if (!ready) return null;

  return (
    <nav
      className="navbar-expand-sm"
      style={
        isHomePage
          ? {
              background: "transparent",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 1000,
            }
          : {
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/NavHatter.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              zIndex: 1000,
            }
      }
    >
      <div
        className="container-fluid"
        style={{
          width: "100%",
          padding: "0",
          height: "39px",
          borderBottom: "1px solid white",
          marginBottom: "1px",
          position: "relative",
          zIndex: 1000,
        }}
      >
        {isMobile && menuOpen && (
          <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
        )}

        <ul
          className="menu navbar-nav w-100"
          style={{
            height: "39px",
            display: !isMobile || menuOpen ? "flex" : "none",
            flexDirection: isMobile ? "column" : "row",
            backgroundColor: isMobile ? "#000000e6" : "transparent",
            padding: isMobile ? "10px" : "0",
            position: isMobile ? "absolute" : "static",
            top: isMobile ? "39px" : undefined,
            left: 0,
            right: 0,
            zIndex: 999,
          }}
        >
          <li className="navbar-item">
            <Link className="nav-link" to="/kezdolap" onClick={handleLinkClick}>
              Kezdőlap
            </Link>
          </li>
          {user ? (
            <>
              <li className="navbar-item">
                <Link className="nav-link" to="/bejelentes" onClick={handleLinkClick}>
                  Bejelentés
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" to="/terkep" onClick={handleLinkClick}>
                  Térkép
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" to="/bejelentesek" onClick={handleLinkClick}>
                  Bejelentések
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" to="/menhely" onClick={handleLinkClick}>
                  Menhely
                </Link>
              </li>
              {(user?.role === 0 || user?.role === 1) && (
                <li className="navbar-item">
                  <Link className="nav-link" to="/orokbeadottak" onClick={handleLinkClick}>
                    Örökbeadott cicák
                  </Link>
                </li>
              )}
              <li className="navbar-item">
                <Link
                  className="nav-link"
                  to="/profil"
                  onClick={() => {
                    handleLinkClick();
                    setAktualisFelhasznalo(null);
                  }}
                >
                  Profilom
                </Link>
              </li>
              <li className="logOut navbar-item">
                <Link
                  className="nav-link"
                  to="/kezdolap"
                  onClick={() => {
                    logout();
                    handleLinkClick();
                  }}
                >
                  Kijelentkezés
                </Link>
              </li>
              {(user?.role === 0 || user?.role === 1) && (
                <li className="navbar-item">
                  <Link className="nav-link" to="/users" onClick={handleLinkClick}>
                    Felhasználók
                  </Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link className="nav-link" to="/bejelentkezes" onClick={handleLinkClick}>
                  Bejelentkezés
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" to="/regisztracio" onClick={handleLinkClick}>
                  Regisztráció
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" to="/terkep" onClick={handleLinkClick}>
                  Térkép
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" to="/menhely" onClick={handleLinkClick}>
                  Menhely
                </Link>
              </li>
            </>
          )}
        </ul>

        {isMobile && (
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü megnyitása/zárása"
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "26px",
              position: "absolute",
              top: "4px",
              right: "15px",
              zIndex: 9999,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </div>
    </nav>
  );
}
