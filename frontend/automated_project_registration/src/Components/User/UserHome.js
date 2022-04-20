import React, { useEffect, useState,useContext } from 'react'
import { Link } from 'react-router-dom';
import Cards from '../Cards'
import Navbar from './Navbar';
function UserHome(props) {
  const [topics,setopic]=useState([]);
  useEffect(async()=>{
    console.log(props.batch)

    // setbatch(props.batch.batch)
    const response = await fetch("http://localhost:8000/student/gettopics/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json();
    setopic(json.msg)
  },[]);
  return (
 <>
 <Navbar/>
 <h3 style={{color:"white"}}>Welcome {"batch"}</h3>
 {topics.map((topic,index)=>{
     return   <div className="container my-3" key={index} >
    <Cards topic={topic}/>
    </div>
    })} 
 
 <Link to="/user/newtopic">Add New Topic</Link>
 </>
  )
}

export default UserHome