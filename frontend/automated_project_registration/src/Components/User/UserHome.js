import React, { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Cards from "../Cards";
import Navbar from "./Navbar";
import "../../CSS/Sidenav.css";
import { HashLink as Link } from "react-router-hash-link";
import MiniContext from "../../Context/MiniContext";

function UserHome() {
  let history = useHistory();
  let location = useLocation();
  const [topics, setopic] = useState([]);
  const [batch, setbatch] = useState(null);
  // console.log(batch);
  const select_topic = async (id) => {
    const response = await fetch("http://localhost:8000/student/gettopics/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ batchid: batch, name: id }),
    });
    const json = await response.json();
    gettopics();
    console.log(json);
  };
  const gettopics = async () => { 
    const response = await fetch("http://localhost:8000/student/gettopics/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // credentials: 'include',
      body: JSON.stringify({ selected_by: " ", name: " " }),
    });
    const json = await response.json();
    console.log(json);
    if (json.msg === "Selected") {
    } else setopic(json.msg);
  };
  useEffect(async () => {
    if (location.state != undefined) {
      setbatch(location.state.batch);
    }
    gettopics();
    // fetch("http://127.0.0.1:8000/student/user-in-homepage/")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data.code);
    //   });
    const response1 = await fetch("http://localhost:8000/student/user-in-homepage/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
  })
    const json1 = await response1.json();
    console.log(json1);
  }, []);

  return (
    <>
      <section id="sidenavhead">
        <header>
          {" "}
          <Navbar batch={batch} />
        </header>

        <nav id="sidenav">
          <ul>
            {topics.map((topic, index) => {
              return (
                <li key={index}>
                  <Link to={`#section-${index}`}>
                    {topic.name.substring(0, 18)}...
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <main>
          {topics.map((topic, index) => {
            return (
              <section key={index} id={`section-${index}`}>
                <Cards
                  topic={topic}
                  index={index}
                  select_topic={select_topic}
                />
              </section>
            );
          })}
        </main>
      </section>
    </>
  );
}

export default UserHome;
