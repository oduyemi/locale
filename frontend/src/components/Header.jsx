import React from "react";
import { Link } from "react-router-dom";


export const Header = () => {
    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark probootstrap_navbar" id="probootstrap-navbar">
                <div className="container">
                    <Link className="navbar-brand" to="/">Locale</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#probootstrap-menu" aria-controls="probootstrap-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span><i className="ion-navicon"></i></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="probootstrap-menu">
                        <ul className="navbar-nav">
                            <li className="nav-item active mt-3"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item mt-3"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                            <li className="nav-item mt-3"><Link className="nav-link" to="/guide">Guides</Link></li>
                        </ul>
                    </div>
                    <div className="ml-auto">
                        <Link className="nav-link" to="/login">
                            <button className="btn btn-success">Login</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}