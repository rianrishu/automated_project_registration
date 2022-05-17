import React,{useState,useEffect,useContext} from 'react'
import Table from './Table'
import '../../CSS/adgettopic.css'
function GetTopics() {
    
    const [results,setresults]=useState([]);
    useEffect(async()=>{
        const response1 = await fetch("http://localhost:8000/admin1/getalltopics/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
        const json = await response1.json();
        // json.sort((a, b) => a.name.localeCompare(b.name))
        setresults(json.msg)
    },[])
  return (
    <section id="adgettopic">
     <div className="table-wrapper">
    <table className="fl-table">
             <thead>
            <tr>
            <th>S.No</th>
            <th>Topic</th>
            <th>Description</th>
            <th>Faculty</th>
            <th>Selected_by</th>
           </tr>
           </thead>
           <tbody>
           {results.map((res,index)=>{
     return  <tr key={index}>
     <Table res={res} index={index+1}/>
    </tr>
    })}
      </tbody>
       </table>
       </div>
    </section>
  )
}

export default GetTopics