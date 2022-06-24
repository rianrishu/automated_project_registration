import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
function UserSignup() {
  let history = useHistory();
  const [credentials, setcred] = useState({
    Leader_name: "",
    member1_name: "",
    member2_name: "",
    Leader: "",
    Student1: "",
    Student2: "",
    section: "a",
    password: "",
  });
  const handlesubmit = async () => {
    let reg =
      /^1SI[0-9]{2}CS([1-9][0-9][0-9]|[0-9][1-9][0-9]|[0-9][0-9][1-9])$/;
    if (!reg.test(credentials.Student1)) {
      alert(`Not Valid Usn ${credentials.Student1}`);
      return;
    }
    if (!reg.test(credentials.Student2)) {
      alert(`Not Valid Usn ${credentials.Student2}`);
      return;
    }
    if (!reg.test(credentials.Leader)) {
      alert(`Not Valid Usn ${credentials.Leader}`);
      return;
    }
    console.log(credentials);
    const response = await fetch("http://localhost:8000/student/signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_leader_name: credentials.Leader_name,
        student_1_name: credentials.member1_name,
        student_2_name: credentials.member2_name,
        student_leader: credentials.Leader,
        student_1: credentials.Student1,
        student_2: credentials.Student2,
        section: credentials.section,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (response.status === 200) {
      alert(`Your Batch is ${json.batch}`);
      history.push("./user/login");
    } else {
      alert("Internal Server Error");
    }
  };
  const onchange = (e) => {
    setcred({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="login-box">
      <h2>SignUp</h2>
      <form>
        <div className="user-box">
          <input
            type="text"
            name="Leader_name"
            onChange={onchange}
            required=""
          />
          <label>Team Leader Name </label>
        </div>
        <div className="user-box">
          <input type="text" name="Leader" onChange={onchange} required="" />
          <label>Team Leader USN (EX:-1SI19CS001)</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="member1_name"
            onChange={onchange}
            required=""
          />
          <label>Team Member 1 Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="Student1" onChange={onchange} required="" />
          <label>Team Member 1 USN (EX:-1SI19CS001)</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="member2_name"
            onChange={onchange}
            required=""
          />
          <label>Team Member 2 Name</label>
        </div>
        <div className="user-box">
          <input type="text" name="Student2" onChange={onchange} required="" />
          <label>Team Member 2 USN (EX:-1SI19CS001)</label>
        </div>
        <div className="user-box">
          <select name="section" onChange={onchange}>
            <option name="A" value="a" default style={{ color: "black" }}>
              A
            </option>
            <option name="B" value="b" style={{ color: "black" }}>
              B
            </option>
            <option name="C" value="c" style={{ color: "black" }}>
              C
            </option>
          </select>
          <label
            style={{ color: "black", marginTop: "-18px", "font-size": "12px" }}
          >
            Section
          </label>
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
        <Link onClick={handlesubmit}>
          {/* <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit */}
          <button className="custom-btn btn-9">Submit</button>
        </Link>
      </form>
    </div>
  );
}

export default UserSignup;
