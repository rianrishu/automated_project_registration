import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
function FacultyHome() {
  let location = useLocation();
  let abc="/"
  const [faculty, setfaculty] = useState("");
  const [notifyFaculty, setnotifyFaculty] = useState("/");
  const callnotifyfacutly=async()=>{
    console.log(notifyFaculty)
    const response = await fetch("http://localhost:8000/notify/faculty/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"status": abc})
    })
    const json = await response.json()
    setnotifyFaculty(json.msg)
  }
  useEffect(async () => {
    if (location.state != undefined) {
      setfaculty(location.state.userid);
      
    }
    callnotifyfacutly();
  }, []);
  return (
    <>
      <section id="sidenavhead">
        <header>
          {" "}
          <Navbar faculty={faculty} />
        {notifyFaculty === "true" ? <div className="alert alert-success" role="alert">
          Faculty are notified to add the topic
        </div> : <div></div>}
        </header>
      </section>
    </>
  );
}

export default FacultyHome;
