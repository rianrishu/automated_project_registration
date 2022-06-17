import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToggleButton } from "react-bootstrap";

function Navbar() {
  const [notifyFaculty, setnotifyFaculty] = useState("/");
  const [openTopic, setopenTopic] = useState("/");
  let history = useHistory();
  let abc = "/";
  let abc1 = "/";
  const callnotifyfacutly = async () => {
    console.log(notifyFaculty);
    const response = await fetch("http://localhost:8000/notify/faculty/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: abc }),
    });
    const json = await response.json();
    setnotifyFaculty(json.msg);
  };
  const callnotifystudent = async () => {
    const response1 = await fetch(
      "http://localhost:8000/notify/student-post/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: abc1 }),
      }
    );
    const json1 = await response1.json();
    setopenTopic(json1.msg);
  };

  const handleclkfac = () => {
    if (notifyFaculty === "true") {
      abc = "false";
      setnotifyFaculty("false");
    } else {
      abc = "true";
      setnotifyFaculty("true");
    }
    callnotifyfacutly();
  };
  const handleclkstu = () => {
    if (openTopic === "true") {
      abc1 = "false";
      setopenTopic("false");
    } else {
      abc1 = "true";
      setopenTopic("true");
    }
    callnotifystudent();
  };
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

  useEffect(async () => {
    callnotifyfacutly();
    const response1 = await fetch("http://localhost:8000/notify/student-get/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json1 = await response1.json();
    console.log(json1);
    setopenTopic(json1.msg);
  }, []);

  return (
    <nav
      className="navbar fixed-top  navbar-expand-lg navbar-dark "
      style={{ background: "#394867", width: "100%" }}
    >
      <div
        className="container-fluid"
        style={{
          "margin-left": "1rem",
        }}
        // onMouseOver={MouseOver}
        // onMouseOut={MouseOut}
        // style={{ display: "block", width: "98vw", background: "pink" }}
      >
        <Link className="navbar-brand" to="#">
          Welcome : Admin
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
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ "margin-left": "1.5rem" }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={{ pathname: "/admin/gettopics" }}
              >
                All Topic
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
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={{ pathname: "/admin/phase1", state: { phase: 1 } }}
              >
                Phase1 Marks
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={{ pathname: "/admin/phase1", state: { phase: 2 } }}
              >
                Phase2 Marks
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={{ pathname: "/admin/phase1", state: { phase: 3 } }}
              >
                Phase3 Marks
              </Link>
            </li>
          </ul>
          <ul>
            {/* <li className="nav-item dropdown"> */}
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
              style={{
                color: "white",
                "padding-right": "5rem",
                "padding-top": "16px",
              }}
            >
              Notification
            </a>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={handleclkfac}>
                  Notify Faculty : {notifyFaculty}
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleclkstu}>
                  Open topic to Student : {openTopic}
                </button>
              </li>
            </ul>
            {/* </li> */}
          </ul>
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
