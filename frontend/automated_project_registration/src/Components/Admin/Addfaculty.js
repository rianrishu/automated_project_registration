import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import { useLocation, useHistory, Link } from "react-router-dom";
function Addfaculty() {
  const [credentials, setcred] = useState({ username: " ", password: " " });
  const handlesubmit = async () => {
    const response = await fetch(
      "http://localhost:8000/admin1/createfaculty/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: credentials.username,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (response.status == 202) {
      alert("Succesfullty Added");
    } else alert("User Already Exist");
  };
  const onchange = (e) => {
    setcred({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <section id="loginpage">
      <div className="login-box">
        <h2>Add Faculty</h2>
        <form onSubmit={handlesubmit}>
          <div className="user-box">
            <input
              type="text"
              name="username"
              id="username"
              onChange={onchange}
              required=""
            />
            <label>User Name</label>
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
            style={{ display: "flex", "justify-content": "center" }}
            to="#"
            onClick={handlesubmit}
          >
            <div className="d-flex justify-content-center">
              <button className="custom-btn btn-9">Submit</button>
            </div>
          </Link>
        </form>
        <Button
          color="primary"
          variant="outlined"
          to="/admin/homepage"
          component={Link}
        >
          Back
        </Button>
      </div>
    </section>
  );
}

export default Addfaculty;
