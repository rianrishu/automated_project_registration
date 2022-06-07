import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
import Button  from "@material-ui/core/Button";

function BatchDetails({topics1}) {
  
  return (
    <div id="login-box" className="login-box">
    <form >
      <div className="user-box">
        <h4>{topics1.name}</h4>
      </div>
      <br/>
      <div className="user-box">
          {topics1.description}
      </div>
      <br/>
      <div className="user-box">
          <span style={{fontWeight:"bold"}}>Phase 0 : </span>{topics1.phase0}
      </div>
      <div className="user-box">
      <span style={{fontWeight:"bold"}}>Phase 1 : </span>{topics1.phase1}
      </div>
      <div className="user-box">
      <span style={{fontWeight:"bold"}}>Phase 2 : </span>{topics1.phase2}
      </div>
    </form>
  </div>
  );
}

export default BatchDetails;
