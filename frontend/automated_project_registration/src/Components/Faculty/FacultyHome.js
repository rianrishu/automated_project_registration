import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from 'react-router-dom'
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
function FacultyHome() {
    let location=useLocation()
  const [faculty,setfaculty]=useState("");  
    useEffect(async () => {
        if (location.state != undefined) {
          setfaculty(location.state.userid);
        }
      }, []);
  return (
    <>
      <section id="sidenavhead">
        <header>
          {" "}
          <Navbar faculty={faculty}/>
        </header>
      </section>
    </>
  );
}

export default FacultyHome;
