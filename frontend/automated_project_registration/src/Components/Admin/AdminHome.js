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
  const [abc, setabc] = useState(1);
  let history = useHistory();
  const select_topic = async (
    name,
    description,
    selected_by,
    faculty,
    status
  ) => {
    if (status === "Rejected") faculty = "";
    const response = await fetch(
      "http://localhost:8000/admin1/topic-accept-reject/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          selected_by: selected_by,
          faculty: faculty,
          status: status,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    gettopics();
  };
  const gettopics = async () => {
    const response = await fetch(
      "http://localhost:8000/admin1/get-topic-student/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.data.length != 0) {
      setopic(json.data);
      setabc(0);
    } else setabc(1);
  };
  useEffect(async () => {
    if (localStorage.getItem("token")) {
      if (location.state != undefined) {
        setbatch(location.state.batch);
      }
      gettopics();
    } else {
      alert("Login First");
      history.push("/");
    }
  }, []);

  return (
    <>
      <section id="sidenavhead" style={{ height: "100vh" }}>
        <header>
          {" "}
          <Navbar />
        </header>
        <nav id="sidenav" style={{ height: "100vh", "margin-top": "5em" }}>
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
        <main style={{ height: "100vh", "margin-top": "3rem" }}>
          {abc == 1 ? (
            <h1
              style={{ color: "grey", align: "center", "margin-top": "3rem" }}
            >
              No Topics To display
            </h1>
          ) : (
            topics.map((topic, index) => {
              return (
                <section
                  key={index}
                  id={`section-${index}`}
                  style={{
                    padding: "2rem",
                    "margin-top": "1em",
                    width: "82vw",
                  }}
                >
                  <Cards
                    style={{}}
                    topic={topic}
                    index={index}
                    disab={abc}
                    select_topic={select_topic}
                  />
                </section>
              );
            })
          )}
        </main>
      </section>
    </>
  );
}

export default AdminHome;
