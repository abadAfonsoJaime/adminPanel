import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo_130aniversario.svg";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-sm bg-light"
      //style={{ backgroundColor: "#61c8ec" }}
      //style={{ backgroundColor: "#4f87ce" }}
    >
      <span className="navbar-brand">
        <img src={logo} width="191.5" height="37.5" alt="Purisima" />
      </span>
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link active" to="/">
          Listado <span className="sr-only">(current)</span>
        </NavLink>
        <NavLink className="nav-item nav-link" to="/phoneSimulator">
          Nueva Campaña
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
