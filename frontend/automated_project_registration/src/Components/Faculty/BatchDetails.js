import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
import Button  from "@material-ui/core/Button";

function BatchDetails() {

  let  location=useLocation()
  let name,batch,description,id;
   const [details,setdetails]=useState({"name":"null","description":"null","batch":"null","id":"null"})
  useEffect(() => {
    if(location.state.id!=undefined)
    {
      console.log(location.state)
     setdetails({...details,["name"]:location.state.name,["description"]:location.state.description,["batch"]:location.state.batch,["id"]:location.state.id})
  
    }
  }, [])
  

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
      <div className="user-box">
          Phase 0:
      </div>
      <div className="user-box">
          Phase 1:
      </div>
      <div className="user-box">
          Phase 2:
      </div>
      <div className="d-flex justify-content-around">
      <Link to="#" className='custom-btn btn-9'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Update
      </Link>
    </div>
    </form>
    <Button color="secondary" variant="contained" to="/admin/homepage" component={Link}>
            Back
          </Button>
  </div>
  );
}

export default BatchDetails;
