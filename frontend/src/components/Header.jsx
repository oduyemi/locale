import React, { useState, useContext} from "react";
import { UserContext } from "../UserContext";
import { LogOut } from "./LogOut";
import { PersonOutline, Grid } from "react-ionicons";
import { Link } from "react-router-dom";


export const Header = () => {
    const { user } = useContext(UserContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };

    const renderMobileMenu = () => {
        return (
          isMobileMenuOpen && (
            <div className="mobile-menu-popup">
              <div className="mobile-menu-content sm:block md:hidden">           
                  <button className="close-button" onClick={closeMobileMenu}>
                  X
                  </button>
                    <Link to="/" className="mobile-menu-link text-2xl text-light" onClick={closeMobileMenu}>Home</Link>
                    <Link to="/dashboard" className="mobile-menu-link text-2xl text-light" onClick={closeMobileMenu}>Dashboard</Link>
                    <Link to="/guide" className="mobile-menu-link text-2xl text-light" onClick={closeMobileMenu}>City Guides</Link>
              </div>
            </div>
          )
        );
      };

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark probootstrap_navbar" id="probootstrap-navbar">
                <div className="container">
                    <Link className="navbar-brand" id="locale" to="/">Locale</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#probootstrap-menu" aria-controls="probootstrap-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span>
                            <Grid
                                color={"#ffffff"}
                                height="32px"
                                width="32px"
                                onClick={toggleMobileMenu}
                            />
                        </span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="probootstrap-menu">
                        <ul className="navbar-nav">
                            <li className="nav-item active mt-3"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item mt-3"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                            <li className="nav-item mt-3"><Link className="nav-link" to="/guide">City Guides</Link></li>
                        </ul>
                    </div>
                    <div className="ml-auto">
                    {user ? (
                            <div className="cta">
                                <p className="mt-5 d-inline">{user && user.fname} {user && user.lname}</p>&emsp;<span>
                                <Link to="/profile">
                                    <PersonOutline
                                        color={"#ffffff"}
                                        height="20px"
                                        width="20px"
                                    />
                                </Link> &emsp;
                                <LogOut /> </span>
                            </div>
                        ) : (
                        <Link className="nav-link" to="/login">
                            <button className="btn btn-success">Login</button>
                        </Link>
                        )}
                    </div>
                </div>
            </nav>
            {renderMobileMenu}
        </header>
    )
}