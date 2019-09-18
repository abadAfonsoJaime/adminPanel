import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="row no-gutters">
      <div className="col-sm-12">
        <nav className="navbar navbar-expand-sm bg-light">
          {/* <span className="navbar-brand mb-0"></span> */}

          <div className="row navbar-nav">
            <NavLink className="nav-item nav-link active" to="/">
              Listado <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink className="nav-item nav-link" to="/phoneSimulator">
              Nueva Campaña
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
