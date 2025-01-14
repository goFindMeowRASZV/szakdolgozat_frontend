import React, {useContext} from 'react'
import {Outlet, Link} from "react-router-dom";
import AuthContext from '../model/contexts/AuthContext';

function Layout() {
    const {kijelentkezes_fv}=useContext(AuthContext)
    return (
        <div className="container">
            <header className="App-header">
                <h1>GoFindMeow</h1>
            </header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Kezdőlap</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/regisztracio">Regisztráció</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bejelentkezes">Bejelentkezés</Link>
                        </li>
                    </ul>
                    <button className="btn btn-dark">Kijelentkezés</button>
                </div>
            </nav>
            <article>
                <Outlet />
            </article>
            <footer></footer>
        </div>
    );
}

export default Layout