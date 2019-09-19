import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="row no-gutters">
      <div className="col-12">
        <nav className="navbar navbar-expand-sm bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="row navbar-nav">
            <NavLink className="nav-item nav-link active" to="/">
              Listado <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink className="nav-item nav-link" to="/cards/new">
              Nueva Campaña
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
