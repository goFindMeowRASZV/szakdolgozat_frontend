import React from "react";
import {Outlet} from "react-router-dom";
import Navigacio from "./Navigacio";

function Layout() {
    return (
        <div className="container">
            <header className="App-header">
                <h1>GoFindMeow</h1>
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