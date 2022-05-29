import React, { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Cards from "./Cards";
import Navbar from "./Navbar";
import "../../CSS/Sidenav.css";
import { HashLink as Link } from "react-router-hash-link";
function UserHome() {
  let history = useHistory();
  let location = useLocation();
  const [topics, setopic] = useState([]);
  const [batch, setbatch] = useState(null);

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
  };
  const gettopics = async () => {
    let url="http://localhost:8000/student/gettopics/"
    const response = await fetch("http://localhost:8000/student/gettopics/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"name":" "})
    });
    const json = await response.json();
    
    if(json.msg==="Selected")
    {
 
    }
    else
    setopic(json.msg);
  
  };
  useEffect(async () => {
    if(localStorage.getItem('token')){
    const response = await fetch("http://localhost:8000/student/user-in-homepage/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({"token":localStorage.getItem('token')})
    });
     const json=await response.json();
     if(response.status===200){
     gettopics();
     setbatch(json.msg)
     }
     else{
       alert('Please Login using valid token')
       history.push('/')
     }
    }
    else{
      alert('Login First')
      history.push('/user/login')
    }
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
