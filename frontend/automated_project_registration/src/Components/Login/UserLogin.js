import React, { useState, useContext } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import MiniContext from "../../Context/MiniContext";
import "../../CSS/Login.css";
function UserLogin(props) {
  const history = useHistory();
  let context = useContext(MiniContext);
  const { setconbch } = context;
  const [credentials, setcred] = useState({ batch: " ", password: " " });
  const handlesubmit = async () => {
    const response = await fetch("http://localhost:8000/student/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        batch: credentials.batch,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", json.jwt);

      history.push({
        pathname: "/user/homepage",
        state: { batch: credentials.batch },
      });
      // useCallbackUpdate(credentials.batch)
    } else alert("Wrong Credentials");
  };
  const onchange = (e) => {
    setcred({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <section id="loginpage">
      <div className="login-box">
        <h2>User Login</h2>
        <form onSubmit={handlesubmit}>
          <div className="user-box">
            <input
              type="text"
              name="batch"
              id="batch"
              onChange={onchange}
              required=""
            />
            <label>BatchId</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              id="password"
              onChange={onchange}
              required=""
            />
            <label>Password</label>
          </div>
          <Link
            to="#"
            onClick={handlesubmit}
            style={{ display: "flex", "justify-content": "center" }}
          >
            <div className="d-flex justify-content-center">
              <button className="custom-btn btn-9">Submit</button>
            </div>
          </Link>
        </form>
        <Link
          to="/user/signup"
          style={{ display: "flex", "justify-content": "center" }}
        >
          <button className="custom-btn btn-9">Create New User</button>
        </Link>
      </div>
    </section>
  );
}

export default UserLogin;
