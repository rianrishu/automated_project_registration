import React, { useEffect,useState } from "react";
import { Link,useHistory } from "react-router-dom";
import { Nav, NavBar, Container, Button } from "react-bootstrap";

function Navbar({batch}) {
  const [batch1,setbatch]=useState("0")
  let history=useHistory()
   const handleclick=async()=>{
  history.push('/')
   }
   useEffect(()=>{
    setbatch(batch)
   },[batch])
  return (
    <nav className="btn-8 navbar sticky-top  navbar-expand-lg navbar-dark " style={{background: "#394867"}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Welcome : {batch1}
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={{pathname:"/user/newtopic",state:batch1}}>
                Add Topic
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
