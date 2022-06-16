
import { useState,useEffect } from 'react';
import {useLocation} from "react-router-dom"
import Loading  from '../../Loading'
import Phase_Table from './Phase_Table';
function PhaseMarks() {
    let location=useLocation();
    const [phase,setphase]=useState(null)
    const [st_details,setdetails]=useState([])
    let [loading,setloading]=useState(true);
    let abc="/"
    useEffect(async() => {
        if(location.state!=undefined){
        setphase(location.state.phase)
        abc=location.state.phase
        console.log(abc)
        }
        const response = await fetch("http://localhost:8000/admin1/getphasemarks/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"Phase":abc})
          })
          const json = await response.json();
          json.msg.sort((a, b) => a.Usn.localeCompare(b.Usn))
          if (response.status == 200)
          setdetails(json.msg)
          else
          alert('Some Error Occured')
          setloading(false)
    }, [])
    
  return (
    <div>
    {loading && <Loading/>}
    {!loading &&phase == 1 ?
          <table className="fl-table my-5">
            <thead>
              <tr>
                <th>Batch</th>
                <th>USN</th>
                <th>Identification and formulation of problem statement(10 marks)</th>
                <th>Analysis of problem statement(10 marks)</th>
                <th>Originality of problem statement(10 marks)</th>
                <th>Quality of presentation(10 marks)</th>
                <th>Answers to Queries(10 marks)</th>
                <th>Total Phase 1(50 marks)</th>
                
              </tr>
            </thead>
            <tbody>
              {st_details.map((res,index)=>{
              return <tr key={index}>
                <Phase_Table res={res} index={index} />
              </tr>
              })
                 }

            </tbody>
          </table> :
          phase == 2 ?
            <table className="fl-table my-5">
              <thead>
                <tr>
                <th>Batch</th>
                <th>USN</th>
                  <th>Design and development of solution(10 Marks)</th>
                  <th>Effective usage of modern tools(10 Marks)</th>
                  <th>Work effectively as a team member/team leader(10 Marks)</th>
                  <th>Quality of presentation(10 Marks)</th>
                  <th>Answers to Queries(10 marks)</th>
                  <th>Total Phase 2(50 marks)</th>
                 
                </tr>
              </thead>
              <tbody>
              {st_details.map((res,index)=>{
              return <tr key={index}>
                <Phase_Table res={res} index={index} />
              </tr>
              })
                 }

              </tbody>
            </table> :
            phase == 3 ?
              <table className="fl-table my-5">
                <thead>
                  <tr>
                  <th>Batch</th>
                <th>USN</th>
                    <th>Demonstration of the complete project(10 Marks)</th>
                    <th>Work effectively as a team member/team leader(10 Marks)</th>
                    <th>Presentation, report writing and submission(10 Marks)</th>
                    <th>Answers to Queries(10 Marks)</th>
                    <th>Regularity(10 Marks)</th>
                    <th>Total Phase 3(50 marks)</th>
                    
                  </tr>
                </thead>
                <tbody>
                {st_details.map((res,index)=>{
              return <tr key={index}>
                <Phase_Table res={res} index={index} />
              </tr>
              })
                 }

                </tbody>
              </table> : <></>}
    </div>
  )
}

export default PhaseMarks