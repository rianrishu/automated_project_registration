import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavBar, Container, Button } from "react-bootstrap";

function Navbar() {
  return (
    <nav className="btn-8 navbar sticky-top  navbar-expand-lg navbar-dark " style={{background: "#394867"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Welcome : {"batch"}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/user/newtopic">
                Add Topic
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <button className="custom-btn btn-5">SignOut</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
