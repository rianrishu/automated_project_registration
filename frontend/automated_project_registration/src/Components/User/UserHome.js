import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cards from "../Cards";
import Navbar from "./Navbar";
import '../../CSS/Sidenav.css'
import { HashLink as Link } from 'react-router-hash-link';
function UserHome({batch}) {
  let history = useHistory()
  const [topics,setopic]=useState([]);
  const [batch1,setbatch]=useState(0)
  const select_topic=async (id)=>{
    const response = await fetch("http://localhost:8000/student/gettopics/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "batchid":batch,"name":id })
    })
    const json = await response.json();
    console.log(json)
  }
  useEffect(async () => {
    if(batch!=undefined){
      setbatch(batch)
      }
    const response = await fetch("http://localhost:8000/student/gettopics/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ "batch":props.batch.batch })
    })
    // fetch('http://localhost:8000/student/user-in-homepage/')
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data.code)
    // })
      // const response1=await fetch("/student/user-in-homepage")
      // const json1=await response1.json();
      // setbatch(json1.code);
      // console.log(json1)
      // fetch("/student/user-in-homepage")
      // .then(response => response.json())
      // .then(data => {console.log(data)})
    const json = await response.json();
    setopic(json.msg);
  }, [batch]);
  
  return (
<>
 <section id="sidenavhead">
 <header> <Navbar  batch={batch1}/></header>
 
 <nav id="sidenav">
   <ul>
 {topics.map((topic,index)=>{
     return   <li key={index}>
     <Link to={`#section-${index}`} >{topic.name.substring(0,18)}...</Link>

    </li>
    })}
    </ul>
 </nav>
 <main>
   
 {topics.map((topic,index)=>{
     return   <section key={index} id={`section-${index}`}>
    <Cards topic={topic} index={index} select_topic={select_topic}/>
    </section>
    })}
    
    </main> 
 
 </section>
 </>
  )
}

export default UserHome;
