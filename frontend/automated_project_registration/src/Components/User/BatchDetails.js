import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation,useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
import Button  from "@material-ui/core/Button";

function BatchDetails({topics1}) {
  let abc="/"
  let history=useHistory()
  const [batch, setbatch] = useState("null");
  useEffect(async () => {
    if (localStorage.getItem("token")) {
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
        setbatch(json.msg);
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
      <form action="http://localhost:8000/student/upload-abstract/" method="post" encType="multipart/form-data">
      <div className="user-box">
      Upload Abstract:<input type="file" name="file" accept="application/msword" />
      <input type="text"  name="batch" value={batch}/>
      <input type="submit" value="submit"/>
      </div>
      </form>
    </form>
  </div>
  );
}

export default BatchDetails;
