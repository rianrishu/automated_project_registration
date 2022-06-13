import React, { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Cards from "./Cards";
import Navbar from "./Navbar";
import "../../CSS/Sidenav.css";
import BatchDetails from "./BatchDetails";
import { HashLink as Link } from "react-router-hash-link";
function UserHome() {
  let history = useHistory();
  const [topics, setopic] = useState([]);
  const [topics1, setopic1] = useState([]);
  const [batch, setbatch] = useState("null");
  const [openTopic, setopenTopic] = useState("/");
  const [selected, setselected] = useState("false");
  let abc = null
  const callnotifystudent=async()=>{
    const response1 = await fetch("http://localhost:8000/notify/student-get/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }})
    const json1 = await response1.json()
    setopenTopic(json1.msg)
   }
  const select_topic = async (id) => {
    console.log(id,batch)
    const response = await fetch("http://localhost:8000/student/gettopics/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ batchid: batch, name: id }),
    });
    const json = await response.json();
    gettopics();
    window.location.reload(true);
  };
  const gettopics = async () => {
    let url = "http://localhost:8000/student/gettopics/";
    const response = await fetch("http://localhost:8000/student/gettopics/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: " ", selected_by: abc }),
    });
    const json = await response.json();

    if (json.msg === "Already Selected") {
      setopenTopic("false")
      setselected("true")
      console.log(json.msg1)
      setopic1(json.msg1);
      return
    }
    setopic(json.msg)
  };
  useEffect(async () => {
    if (localStorage.getItem("token")) {
      callnotifystudent();
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
        abc = json.msg
        // setInterval(() => {
          // }, 100000);
          setbatch(json.msg);
          gettopics();  
      } else {
        alert("Please Login using valid token");
        history.push("/");
      }
    } else {
      alert("Login First");
      history.push("/");
    }
    

  }, []);

  return (
    <>
      <section id="sidenavhead">
        <header>
          {" "}
          <Navbar batch={batch} openTopic={openTopic} selected={selected}/>
        </header>
        {openTopic === "true" && selected=="false"? <>
        
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
        </>: (openTopic==="/"||openTopic==="false") && selected=="false"  ? <h1>NO topic to display</h1> : <main><BatchDetails topics1={topics1}/></main>
            }
      </section>
    </>
  );
}

export default UserHome;