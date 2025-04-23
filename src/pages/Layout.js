import React from "react";
import {Outlet} from "react-router-dom";
import Navigacio from "../components/Navigacio";

function Layout() {
    return (
        <div >
            <header className="App-header">
            </header>
                <Navigacio />
            <article>
                <Outlet />
            </article>
            <footer></footer>
        </div>
    );
}

export default Layout