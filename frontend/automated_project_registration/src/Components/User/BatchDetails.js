import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
import Button from "@material-ui/core/Button";

function BatchDetails({ topics1 }) {
  let abc = "/";
  let history = useHistory();
  const [batch, setbatch] = useState("null");

  function redirect() {
    window.location.replace("user/homepage");
    return false;
  }
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
        abc = json.msg;
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
  const handlesub = () => {
    alert("Abstract Submitted Successfully");
  };
  return (
    <div id="batch-details-student" className="login-box">
      <form>
        <div className="user-box">
          <h4>{topics1.name}</h4>
        </div>
        <br />
        <div style={{ textAlign: "justify" }} className="user-box">
          {topics1.description}
        </div>
        <br />
        {/* <iframe name="dummy" id="dummy" style={{"display" : "none"}}></iframe> */}
        <form
          action="http://localhost:8000/student/upload-abstract/"
          method="post"
          encType="multipart/form-data"
          onsubmit={handlesub}
        >
          <div
            style={{ display: "flex", "justify-content": "center" }}
            className="user-box"
          >
            Upload Abstract:
            <input type="file" name="file" accept="application/msword" />
            <input type="hidden" name="batch" value={batch} />
          </div>
          <div style={{ display: "flex", "justify-content": "center" }}>
            <button className="custom-btn btn-9">Submit</button>
          </div>
        </form>
      </form>
    </div>
  );
}

export default BatchDetails;
