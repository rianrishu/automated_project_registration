import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation,useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import BatchDetails from "./BatchDetails";

function SetPhase1() {
    const [topic,settopic]=useState(null)
    const  location=useLocation()
    useEffect(async() => {
        console.log(location.state)
      if(location.state!==undefined)
      {
         settopic(location.state.details)
      }
    }, [])
    
  return (
    <>
    <Navbar/>
              {topic!=null&& <BatchDetails topic={topic}/> }
    </>
  )
}

export default SetPhase1