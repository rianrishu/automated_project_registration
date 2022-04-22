import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Cards from "../Cards";
import Navbar from "./Navbar";
import  '../../CSS/homepage'
function UserHome(props) {
  let history = useHistory();
  const [topics, setopic] = useState([]);
  console.log("abc");
  const leaveButtonPressed = async () => {
    // const response = await fetch("http://localhost:8000/student/leave-homepage/", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // })
    // props.leaveRoomCallback();
    props.leaveRoomCallback();
    history.push("/");
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    // };
    // fetch("student/leave-homepage", requestOptions).then((_response) => {
    //   props.leaveRoomCallback();
    //   history.push("/");
    // });
  };

  useEffect(async () => {
    // console.log(props.batch)

    // setbatch(props.batch.batch)
    const response = await fetch("http://localhost:8000/student/gettopics/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setopic(json.msg);
  }, []);
  return (
    <>
      <Navbar />
      {topics.map((topic, index) => {
        return (
          <div className="container my-3" key={index}>
            <Cards topic={topic} index={index}/>
          </div>
        );
      })}
 <Link to="#section2">CLick</Link>
      <Link to="/user/newtopic">Add New Topic</Link>
      <Link
        className="btn btn-outline-success"
        to="#"
        onClick={leaveButtonPressed}
      >
        SignOut
      </Link>
    </>
  );
}

export default UserHome;
