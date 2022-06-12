import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function AdminLogin() {
  let history = useHistory();
  const [credentials, setcred] = useState({ userid: "", password: "" });
  const handlesubmit = async () => {
    const response = await fetch("http://localhost:8000/admin1/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: credentials.userid,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (response.status == 202) {
      localStorage.setItem("token", json.jwt);
      history.push("/admin/homepage");
    } else alert("Wrong Credentials");
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
          <label>UserID</label>
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
        <Link
          to="#"
          onClick={handlesubmit}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="d-flex justify-content-center">
            <button className="custom-btn btn-9">Submit</button>
          </div>
        </Link>
      </form>
      {/* <Link to="admin/signup">Create New Admin</Link> */}
    </div>
  );
}

export default AdminLogin;
