import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import Cards from "./Card";
import "../../CSS/fullwd.css";
import { HashLink as Link } from "react-router-hash-link";
import { useHistory, useLocation } from "react-router-dom";
function AdminHome() {
  let location = useLocation();
  const [topics, setopic] = useState([]);
  const [batch, setbatch] = useState(null);
  const [abc, setabc] = useState("false");
  const select_topic = async (id) => {
    setabc("true");
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
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setopic(json.msg);
  };
  useEffect(async () => {
    if (location.state != undefined) {
      setbatch(location.state.batch);
    }

    fetch("http://localhost:8000/student/user-in-homepage/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.code);
      });
    gettopics();
  }, []);

  return (
    <>
      <section id="sidenavhead">
        <header>
          {" "}
          <Navbar />
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
                  disab={abc}
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

export default AdminHome;
