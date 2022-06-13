import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation,useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
import '../../CSS/getbatchfaculty.css'
import Loading  from '../../Loading'
import Table from './Table'
function FacultyHome() {
  let location = useLocation();
  let history=useHistory()
  let abc = "/"
  let abc1 = "null"
  let [loading,setloading]=useState(true);
  const [faculty, setfaculty] = useState("");
  const [notifyFaculty, setnotifyFaculty] = useState("/");
  const [topic_details, setTopicDetails] = useState([])

  const callnotifyfacutly = async () => {
    console.log(notifyFaculty)
    const response = await fetch("http://localhost:8000/notify/faculty/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "status": abc })
    })
    const json = await response.json()
    setnotifyFaculty(json.msg)
  }

  const gettopicDetails = async () => {
    const response = await fetch("http://localhost:8000/faculty/batch-details/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: abc1}),
    });
    const json = await response.json();
    setTopicDetails(json)
    setloading(false)
    console.log(json)
  };


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
        setfaculty(json.msg);
        abc1=json.msg
    callnotifyfacutly();
    gettopicDetails();
      } else {
        alert("Please Login using valid token");
        history.push("/");
      }
    }
    else {
      alert("Login First");
      history.push("/");
    }
  }, []);
  const select_topic=async(id,name,description,batch)=>{

      history.push({
        pathname:'/faculty/batchdetails',
        state:{id:id,name:name,description:description,batch:batch} 
           })
  }
  return (
    <section id="facultyhome">
      <section id="sidenavhead">
        <header>
          {" "}
          <Navbar faculty={faculty} />
          {notifyFaculty === "true" ? <div className="alert alert-success" role="alert">
            Faculty are notified to add the topic
          </div> : <div></div>}
        </header>
      </section>
      <br />
      {/* <main style={{"marginTop":"60px"}}>
        {topic_details.map((topic, index) => {
          return (
            // <section key={index} id={`section-${index}`}>
            //   <Cards
            //     topic={topic}
            //     index={index}
            //     select_topic={select_topic}
            //   />
            // </section>
            
          );
        })} */}
      {/* </main> */}
      <div className="table-wrapper">
      {loading && <Loading/>}
        {!loading && <table className="fl-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Batch</th>
              <th>Students</th>
              <th>Topic</th>
              <th>Phase1</th>
              <th>Phase2</th>
              <th>Phase3</th>
              <th>Set Phase </th>
            </tr>
          </thead>
          <tbody>
            {topic_details.map((res, index) => {
              return <tr key={index}>
                <Table res={res} index={index + 1} />
              </tr>
            })}
          </tbody>
        </table>}
        </div>
    </section>
  );
}

export default FacultyHome;
