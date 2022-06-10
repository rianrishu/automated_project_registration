import React, { useEffect, useState, useContext,useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";

import Button  from "@material-ui/core/Button";

function BatchDetails() {
  const inputRef0 = useRef();
  const inputRef1= useRef();
  const inputRef2 = useRef();
  let  location=useLocation()
  let name,batch,description,id;
  const handlePhase=async()=>{
    const response1 = await fetch("http://localhost:8000/faculty/getsetphase/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"phase0":details.phase0,"phase1":details.phase1,"phase2":details.phase2,"student_leader":details.batch})
    })
  }
  const [phase,setph]=useState({"phase0":0,"phase1":0,"phase2":0})
  const [abc,setabc]=useState("0")
   const [details,setdetails]=useState({"name":"null","description":"null","batch":"null","id":"null","phase0":0,"phase1":0,"phase2":0})
  useEffect(async()=> {
    if(location.state.id!=undefined)
    {
      console.log(location.state)
     setdetails({...details,["name"]:location.state.name,["description"]:location.state.description,["batch"]:location.state.batch,["id"]:location.state.id})
     const response1 = await fetch("http://localhost:8000/faculty/getsetphase/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"phase0":details.phase0,"phase1":details.phase1,"phase2":details.phase2,"student_leader":location.state.batch})

    })
    const json = await response1.json();
    console.log(json)
    inputRef0.current.value = json.phase0;
    inputRef1.current.value = json.phase1;
    inputRef2.current.value = json.phase2;
  }
  }, [])
  const handlechg = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div id="login-box" className="login-box">
    <h2>Batch({details.batch})</h2>
    <form >
      <div className="user-box">
        Name:{details.name}
      </div>
      <div className="user-box">
          Description:{details.description}
      </div>
      <div className="d-flex mx-3" >
          Phase 0:  <input type="number"  ref={inputRef0} name="phase0" className="mx-1" maxLength={2} onChange={handlechg} defaultValue={abc}/>
      </div>
      <br/>
      <div className="d-flex mx-3">
          Phase 1:  <input type="number" ref={inputRef1}  name="phase1"  maxLength={2} className="mx-1" onChange={handlechg} defaultValue={details.phase1}/>
      </div>
      <br/>
      <div  className="d-flex mx-3">
          Phase 2:  <input type="number"  ref={inputRef2} name="phase2" maxLength={2} className="mx-1" onChange={handlechg} defaultValue={details.phase2}/>
      </div>
      <br/>
      <div className="d-flex justify-content-around">
      <Link to="#" className='custom-btn btn-9' onClick={handlePhase}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Update
      </Link>
    </div>
    </form>
    <Button color="secondary" variant="contained" to="/faculty/homepage" component={Link}>
            Back
          </Button>
  </div>
  );
}

export default BatchDetails;
