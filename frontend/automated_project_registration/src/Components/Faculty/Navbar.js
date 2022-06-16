import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Navbar(props) {
  let history = useHistory();
  const handleclick = async () => {
    history.push("/");
  };
  function MouseOver(event) {
    event.target.style.background = "white";
  }

  function MouseOut(event) {
    event.target.style.background = "";
  }

  return (
    <nav
      className="btn-8 navbar sticky-top  navbar-expand-lg navbar-dark "
      style={{ background: "#394867", width: "94.96rem" }}
    >
      <div
        className="container-fluid"
        style={{
          "margin-left": "1.5rem",
        }}
        // onMouseOver={MouseOver}
        // onMouseOut={MouseOut}
        // style={{ display: "block", width: "98vw", background: "pink" }}
      >
        <Link className="navbar-brand" to="#">
          Welcome : Faculty
        </Link>
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
              <Link
                className="nav-link active"
                to={{
                  pathname: "/faculty/addtopic",
                  state: { userid: props.faculty },
                }}
              >
                Add Topic
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={{
                  pathname: "/faculty/allphases",
                  // state: { userid: props.faculty },
                }}
              >
                GetAllPhaseDetails
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <button className="custom-btn btn-5" onClick={handleclick}>
              SignOut
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
