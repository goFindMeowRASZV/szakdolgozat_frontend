import React from "react";
import {Outlet} from "react-router-dom";
import Navigacio from "../model/contexts/Navigacio";

function Layout() {
    return (
        <div /* className="container" */>
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