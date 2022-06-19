import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import BatchDetails from "./BatchDetails";

function SetPhase1() {
  const [topic, settopic] = useState(null);
  const [faculty, setfaculty] = useState("");
  const location = useLocation();
  let history = useHistory();
  useEffect(async () => {
    console.log(location.state);
    if (location.state !== undefined) {
      settopic(location.state.details);
    }
    const response = await fetch(
      "http://localhost:8000/student/user-in-homepage/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      }
    );
    const json = await response.json();
    if (response.status === 200) {
      setfaculty(json.msg);
    } else {
      alert("Please Login using valid token");
      history.push("/");
    }
  }, []);

  return (
    <>
      <Navbar faculty={faculty} />
      {topic != null && <BatchDetails topic={topic} />}
    </>
  );
}

export default SetPhase1;
