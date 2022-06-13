import React,{ useState, useEffect, useContext, useRef} from 'react'
import Loading  from '../../Loading'
import { Link, useLocation,useHistory } from "react-router-dom";
import AllPhaseTable from './AllPhaseTable'
function GetAllPhases() {
    let location = useLocation();
  let history=useHistory()
  let abc1 = "null"
  let [loading,setloading]=useState(true);
  const [topic_details, setTopicDetails] = useState([])
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
            abc1=json.msg
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
    
  return (
    <div className="table-wrapper">
      {loading && <Loading/>}
        {!loading && <table className="fl-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Batch</th>
              <th>Students</th>
              <th>Identification and formulation of problem statement(10 marks)</th>
              <th>Analysis of problem statement(10 marks)</th>
              <th>Originality of problem statement(10 marks)</th>
              <th>Quality of presentation(10 marks)</th>
              <th>Answers to Queries(10 marks)</th>
              <th>Phase1_Total(50 marks)</th>
              
            </tr>
          </thead>
          <tbody>
            {topic_details.map((res, index) => {
              return <tr key={index}>
                <AllPhaseTable res={res} index={index + 1} />
              </tr>
            })}
          </tbody>
        </table>}
      </div>
  )
}


export default GetAllPhases;