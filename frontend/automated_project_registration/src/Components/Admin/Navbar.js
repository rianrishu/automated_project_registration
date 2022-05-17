import React, { useEffect,useState } from "react";
import { Link,useHistory } from "react-router-dom";


function Navbar() {
  let history=useHistory()
   const handleclick=async()=>{
  history.push('/')
   }
  return (
    <nav className="btn-8 navbar sticky-top  navbar-expand-lg navbar-dark "   style={{"display":"block","width":"100%"}}>
      <div className="container-fluid">
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={{pathname:"/admin/addtopic"}}>
                Add Topic
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={{pathname:"/admin/gettopics"}}>
                Get All Topic
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <button className="custom-btn btn-5" onClick={handleclick}>SignOut</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;