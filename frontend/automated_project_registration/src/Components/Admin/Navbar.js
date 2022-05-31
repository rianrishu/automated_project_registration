import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToggleButton } from "react-bootstrap";

function Navbar() {
  const [notifyFaculty, setnotifyFaculty] = useState("/");
  const [openTopic, setopenTopic] = useState("/");
  let history = useHistory();
  const handleclkfac=()=>{
    if(notifyFaculty==="true")
    setnotifyFaculty("false");
    else
    setnotifyFaculty("true");
    
  }
  const handleclkstu=()=>{
    if(openTopic==="true")
    setopenTopic("false");
    else
    setopenTopic("true");
    
  }
  const handleclick = async () => {
    history.push("/");
  };
  function MouseOver(event) {
    event.target.style.background = "black";
  }

  function MouseOut(event) {
    event.target.style.background = "";
  }

  function onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }
 const updatesoon=async()=>{
  const response = await fetch("http://localhost:8000/notify/faculty/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"status": notifyFaculty})
  })
  const json = await response.json()
  setnotifyFaculty(json.msg)
  console.log(notifyFaculty)

  const response1 = await fetch("http://localhost:8000/notify/student/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"status": openTopic})
  })
  const json1 = await response1.json()
  setopenTopic(json1.msg)
  console.log(openTopic)
 }
  useEffect(async () => {
   updatesoon();
  }, [])

  return (
    <nav
      className="btn-8 nav1 navbar sticky-top  navbar-expand-lg navbar-dark "
      style={{ background: "#394867", width: "90vw" }}
    >
      <div
        className="container-fluid"
        // onMouseOver={MouseOver}
        // onMouseOut={MouseOut}
        // style={{ display: "block", width: "98vw", background: "pink" }}
      >
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
                to={{ pathname: "/admin/addtopic" }}
              >
                Add Topic
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={{ pathname: "/admin/gettopics" }}
              >
                Get All Topic
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={{ pathname: "/admin/addfaculty" }}
              >
                Add Faculty
              </Link>
            </li>
          </ul>
          <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
    <ul className="dropdown-menu">
      <li><button className="dropdown-item" onClick={handleclkfac}>Notify Faculty : {notifyFaculty}</button></li>
      <li><button className="dropdown-item" onClick={handleclkstu}>Open topic to Student : {openTopic}</button></li>
    </ul>
  </li>
          {/* <ToggleButton 
            id="toggle-check"
            type="checkbox"
            className="mx-2"
            variant="primary"
            checked={false}
            value="1"
          // onChange={(e) => setChecked(e.currentTarget.checked)}
          >
            Notify Faculty
          </ToggleButton>
          <ToggleButton
            id="toggle-check2"
            className="mx-2"
            type="checkbox"
            variant="primary"
            // checked={checked}
            value="1"
            // onChange={(e) => setChecked(e.currentTarget.checked)}
          >
            Open Topics to Student
          </ToggleButton>  */}
       
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
