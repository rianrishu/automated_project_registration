import React, { useEffect, useState, useContext,useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
import Button  from "@material-ui/core/Button";
import Phase1_Table from "./Phase1_Table";
function BatchDetails(props) {
  let {name,st1,st2,st_lead,batch,description}=props.topic
  const [stdent_ph1,setstdent_ph1]=useState();
  const [obj, setobj] = useState({ "Identification": " ", "Analysis": " ", "Originality": " ", "Quality": " ","Answers":' ',"Total":" " })
  const ref = useRef(null)
  const refClose = useRef(null)
  const handleClick = async (e) => {
    refClose.current.click();
    console.log(obj)
    const response = await fetch("http://localhost:8000/admin1/addnewtopic/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name":obj.name, "description":obj.description, "selected_by":obj.selected_by,"faculty":obj.faculty,"id_topic":obj.id })
    })
<<<<<<< HEAD
  }
  const downloadab=async()=>{
    const response1 = await fetch("http://localhost:8000/student/download-abstract/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"batch":details.batch})
    })
    const json1=await response1.json();
  }
  const [phase,setph]=useState({"phase0":0,"phase1":0,"phase2":0})
  const [abc,setabc]=useState("0")
   const [details,setdetails]=useState({"name":"null","description":"null","batch":"null","id":"null","phase0":0,"phase1":0,"phase2":0})
  useEffect(async()=> {
    if(location.state.id!=undefined)
    {
      console.log(location.state)
     setdetails({...details,["name"]:location.state.name,["description"]:location.state.description,["batch"]:location.state.batch,["id"]:location.state.id})
     const response1 = await fetch("http://localhost:8000/faculty/getsetphase/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"phase0":details.phase0,"phase1":details.phase1,"phase2":details.phase2,"student_leader":location.state.batch})
=======
    const json = await response.json();
if(response.status==200)
    alert( "Topic Updated Successfully")
    else
    alert( "Already 3 batches are assigned")
>>>>>>> bb1dedd4d48f068194ea2938b3b282a10c25c421

  }
  useEffect(async() => {
    const response = await fetch("http://localhost:8000/faculty/get_phase_marks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "phase":1,"student_leader":st_lead,"student_1":st1,"student_2":st2 })
    })
    const json = await response.json()
    console.log(json.msg)
    setstdent_ph1(json.msg)
  }, [])
  const handlechg = (e) => {
    console.log(e.target.value)
    setobj({ ...obj, [e.target.name]: e.target.value })
  }
  const setmarks = (index) => {
    console.log(stdent_ph1[index])
    ref.current.click();
    setobj({ "Identification": stdent_ph1[index].Identification, "Analysis": stdent_ph1[index].Analysis, "Originality": stdent_ph1[index].Originality, "Quality": stdent_ph1[index].Quality,"Answers": stdent_ph1[index].Answers,"Total": stdent_ph1[index].Total   })
  }

  return (
    <>
     <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" >
            <div className="modal-header " style={{ "background": "antiquewhite" }}>
              <h5 className="modal-title" id="exampleModalLabel">Edit Marks</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ "background": "burlywood" }}>
              <form className="question  p-3 border-bottom" style={{ "background": "burlywood" }}>
              <div className="ans ml-2  my-3">
              <label className="radio">Identification:
                  <input value={obj.Identification} type="number" className="mx-2"  placeholder='Enter No' onChange={handlechg} name="Identification"  required></input>
                </label>
                </div>
                <div className="ans ml-2  my-3">
                <label className="radio">Analysis:
                  <input value={obj.Analysis} type="number" className="mx-2"  placeholder='Enter No' onChange={handlechg} name="Analysis" required></input>
                </label>
                </div>
                
                <div className="ans ml-2  my-3">
                  <label className="radio">Originality:
                    <input value={obj.Originality}  type="number"  onChange={handlechg} name="Originality" className='mx-2' style={{ background: "burlywood" }} required/>
                  </label>
                </div>
                <div className="ans ml-2  my-3">
                  <label className="radio">Quality:
                    <input value={obj.Quality} type="number"  onChange={handlechg} name="Quality" className='mx-2' style={{ background: "burlywood" }} required/>
                  </label>
                </div>
               
                <div className="ans ml-2  my-3">
                  <label className="radio">Answers:
                    <input value={obj.Answers} type="number"   onChange={handlechg} name="Answers" className='mx-2' style={{ background: "burlywood" }} required/>
                  </label>
                </div>
                <div className="ans ml-2  my-3">
                  <label className="radio">Total:
                    <input value={obj.Total} type="number"  onChange={handlechg} name="Total" className='mx-2' style={{ background: "burlywood" }} required/>
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{ "background": "antiquewhite" }}>
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={obj.Identification.length < 1 || obj.Analysis.length < 1 || obj.Quality.length <1 ||obj.Originality.length > 2 } onClick={handleClick} type="button" className="btn btn-primary">Update Topic</button>
            </div>
          </div>
        </div>
      </div>
    <div id="login-box" className="login-box my-5">
    <h2>Batch({batch})</h2>
    {/* <form > */}
      <div className="user-box my-5">
        Name:{name}
      </div>
      <div className="user-box">
          Description:{description}
      </div>
      {<table className="fl-table my-5">
          <thead>
            <tr>
              <th>Batch</th>
              <th>Students</th>
              <th>Identification and formulation of problem statement(10 marks)</th>
              <th>Analysis of problem statement(10 marks)</th>
              <th>Originality of problem statement(10 marks)</th>
              <th>Quality of presentation(10 marks)</th>
              <th>Answers to Queries(10 marks)</th>
              <th>Total(50 marks)</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
             <tr >
                <Phase1_Table res={props.topic} stdent_ph1={stdent_ph1} setmarks={setmarks}/>
              </tr>

          </tbody>
        </table>}
      <div className="d-flex justify-content-around">
      {/* <Link to="#" className='custom-btn btn-9'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Update
      </Link> */}
    </div>
    {/* </form> */}
    <Button color="secondary" variant="contained" to="/faculty/homepage" component={Link}>
            Back
          </Button>
          <Button color="secondary" variant="contained"  onClick={downloadab}>
            Download Abstract
          </Button>
  </div>
  </>
  );
}

export default BatchDetails;
