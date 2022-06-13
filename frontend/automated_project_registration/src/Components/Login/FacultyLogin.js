import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import '../../CSS/Login.css'
function FacultyLogin() {
  let history = useHistory();
  const [credentials, setcred] = useState({ userid: "", password: "" });
  const handlesubmit = async () => {
    const response = await fetch("http://localhost:8000/faculty/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: credentials.userid,
        password: credentials.password,
      }),
    });
    console.log(response)
    const json = await response.json();
    if (response.status == 202) {
      localStorage.setItem('token',json.jwt)
    history.push(
      {
        pathname: '/faculty/homepage',
        state: { userid:credentials.userid}
      }
    );
    }
    else alert("Wrong Credentials");
  };
  const onchange = (e) => {
    setcred({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="login-box">
      <h2>Login</h2>

      <form onSubmit={handlesubmit}>
        <div className="user-box">
          <input type="text" name="userid" onChange={onchange} required="" />
          <label>UserId</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            onChange={onchange}
            required=""
          />
          <label>Password</label>
        </div>
        <Link to="#" onClick={handlesubmit}>
          <div className="d-flex justify-content-center">
            <button className="custom-btn btn-9">Submit</button>
          </div>
        </Link>
      </form>
    </div>
  );
}
<script
  src="https://kit.fontawesome.com/fcf3364399.js"
  crossorigin="anonymous"
></script>;

export default FacultyLogin;
