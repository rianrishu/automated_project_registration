import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
import Cards from "./Cards";
function FacultyHome() {
  let location = useLocation();
  let abc = "/"
  const [faculty, setfaculty] = useState("");
  const [notifyFaculty, setnotifyFaculty] = useState("/");
  const [topic_details, setTopicDetails] = useState([])

  const callnotifyfacutly = async () => {
    console.log(notifyFaculty)
    const response = await fetch("http://localhost:8000/notify/faculty/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "status": abc })
    })
    const json = await response.json()
    setnotifyFaculty(json.msg)
  }

  const gettopicDetails = async () => {
    const response = await fetch("http://localhost:8000/faculty/batch-details/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: "HK VEDAMURTHY" }),
    });
    const json = await response.json();
    setTopicDetails(json)

  };


  useEffect(async () => {
    if (location.state != undefined) {
      setfaculty(location.state.userid);

    }
    callnotifyfacutly();
    gettopicDetails();
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
      <br />
      <main>
        {topic_details.map((topic, index) => {
          return (
            <section key={index} id={`section-${index}`}>
              <Cards
                topic={topic}
                index={index}
              />
            </section>
          );
        })}
      </main>
    </>
  );
}

export default FacultyHome;
