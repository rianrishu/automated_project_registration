import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../CSS/fullwd.css";
import Button from "@material-ui/core/Button";
import Phase_Table from "./Phase_Table";
import Grid from "@material-ui/core/Grid"

function BatchDetails(props) {
  const [tablePhase, settablePhase] = useState(1)
  let { name, st1, st2, st_lead, batch, description } = props.topic
  const [stdent_ph1, setstdent_ph1] = useState();
  const [obj, setobj] = useState({ "USN":" ","Identification": " ", "Analysis": " ", "Originality": " ", "Quality": " ", "Answers": ' ', "Total": " ","Phase":" " })
  const ref = useRef(null)
  const refClose = useRef(null)
  const handleClick = async (e) => {
    refClose.current.click();
    console.log(obj)
    const response = await fetch("http://localhost:8000/faculty/update-marks/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "USN":obj.USN,"Identification": obj.Identification, "Analysis":obj.Analysis, "Originality":obj.Originality, "Quality": obj.Quality, "Answers": obj.Answers, "Total":obj.Total,"Phase":obj.Phase  })
    })
    const json = await response.json();
    if (response.status == 200)
      alert("Topic Updated Successfully")
    else
      alert("Already 3 batches are assigned")

  }
  const handlePhaseDetails = async (phase) => {
    settablePhase(phase)
    await fetch("http://localhost:8000/faculty/get_phase_marks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "phase": phase, "student_leader": st_lead, "student_1": st1, "student_2": st2 })
    })
      .then(response => response.json())
      .then(data => { setstdent_ph1(data.msg) })
  }

  const handleDownloadAbstract = async () => {
    await fetch("http://localhost:8000/student/download-abstract/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "batch": batch })
    })
  }

  const handlechg = (e) => {
    console.log(e.target.value)
    setobj({ ...obj, [e.target.name]: e.target.value })
  }
  const setmarks = (index,usn) => {
    obj.USN=usn
    obj.Phase=tablePhase
    ref.current.click();
    setobj({ ...obj,"Identification": stdent_ph1[index].Identification, "Analysis": stdent_ph1[index].Analysis, "Originality": stdent_ph1[index].Originality, "Quality": stdent_ph1[index].Quality, "Answers": stdent_ph1[index].Answers, "Total": stdent_ph1[index].Total })
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
                  <label className="radio">{tablePhase == 1 ? <>Identification and formulation of problem statement : </> : tablePhase == 2 ? <>Design and development of solution : </> : <>Demonstration of the complete project : </>}
                    <input value={obj.Identification} type="number" className="mx-2" placeholder='Enter No' onChange={handlechg} name="Identification" required></input>
                  </label>
                </div>
                <div className="ans ml-2  my-3">
                  <label className="radio">{tablePhase == 1 ? <>Analysis of problem statement : </> : tablePhase == 2 ? <>Effective usage of modern tools : </> : <>Work effectively as a team member/leader : </>}
                    <input value={obj.Analysis} type="number" className="mx-2" placeholder='Enter No' onChange={handlechg} name="Analysis" required></input>
                  </label>
                </div>

                <div className="ans ml-2  my-3">
                  <label className="radio">{tablePhase == 1 ? <>Originality of problem statement : </> : tablePhase == 2 ? <>Work effectively as a team member/leader : </> : <>Presentation, report writing and submission</>}
                    <input value={obj.Originality} type="number" onChange={handlechg} name="Originality" className='mx-2' style={{ background: "burlywood" }} required />
                  </label>
                </div>
                <div className="ans ml-2  my-3">
                  <label className="radio">{tablePhase == 3 ? <>Answer to Queries </> : <>Quality of presentation : </>}
                    <input value={obj.Quality} type="number" onChange={handlechg} name="Quality" className='mx-2' style={{ background: "burlywood" }} required />
                  </label>
                </div>

                <div className="ans ml-2  my-3">
                  <label className="radio">{tablePhase == 3 ? <>Regularity </> : <>Answer to Queries : </>}
                    <input value={obj.Answers} type="number" onChange={handlechg} name="Answers" className='mx-2' style={{ background: "burlywood" }} required />
                  </label>
                </div>
                <div className="ans ml-2  my-3">
                  <label className="radio">Total Phase {tablePhase}
                    <input value={obj.Total} type="number" onChange={handlechg} name="Total" className='mx-2' style={{ background: "burlywood" }} required />
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{ "background": "antiquewhite" }}>
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={obj.Identification.length < 1 || obj.Analysis.length < 1 || obj.Quality.length < 1 || obj.Originality.length > 2} onClick={handleClick} type="button" className="btn btn-primary">Update Topic</button>
            </div>
          </div>
        </div>
      </div>
      <div id="batch-details-student" className="login-box my-5">
        <h2>Batch : {batch}</h2>
        {/* <form > */}
        <div className="user-box my-3">
          <h4>{name}</h4>
        </div>
        <div >
          {description}
        </div>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Button
              color="primary"
              variant="contained"
              onClick={() => handlePhaseDetails(1)}>
              Phase 1
            </Button>
            <Button color="primary" variant="contained" onClick={() => handlePhaseDetails(2)}>
              Phase 2
            </Button>
            <Button color="primary" variant="contained" onClick={() => handlePhaseDetails(3)}>
              Phase 3
            </Button>
          </Grid>
        </Grid>
        {tablePhase == 1 ?
          <table className="fl-table my-5">
            <thead>
              <tr>
                <th>Students</th>
                <th>Identification and formulation of problem statement(10 marks)</th>
                <th>Analysis of problem statement(10 marks)</th>
                <th>Originality of problem statement(10 marks)</th>
                <th>Quality of presentation(10 marks)</th>
                <th>Answers to Queries(10 marks)</th>
                <th>Total Phase 1(50 marks)</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <Phase_Table res={props.topic} stdent_ph1={stdent_ph1} setmarks={setmarks} />
              </tr>

            </tbody>
          </table> :
          tablePhase == 2 ?
            <table className="fl-table my-5">
              <thead>
                <tr>
                  <th>Students</th>
                  <th>Design and development of solution(10 Marks)</th>
                  <th>Effective usage of modern tools(10 Marks)</th>
                  <th>Work effectively as a team member/team leader(10 Marks)</th>
                  <th>Quality of presentation(10 Marks)</th>
                  <th>Answers to Queries(10 marks)</th>
                  <th>Total Phase 2(50 marks)</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <Phase_Table res={props.topic} stdent_ph1={stdent_ph1} setmarks={setmarks} />
                </tr>

              </tbody>
            </table> :
            tablePhase == 3 ?
              <table className="fl-table my-5">
                <thead>
                  <tr>
                    <th>Students</th>
                    <th>Demonstration of the complete project(10 Marks)</th>
                    <th>Work effectively as a team member/team leader(10 Marks)</th>
                    <th>Presentation, report writing and submission(10 Marks)</th>
                    <th>Answers to Queries(10 Marks)</th>
                    <th>Regularity(10 Marks)</th>
                    <th>Total Phase 3(50 marks)</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <Phase_Table res={props.topic} stdent_ph1={stdent_ph1} setmarks={setmarks} />
                  </tr>

                </tbody>
              </table> : <></>}
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
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleDownloadAbstract}>
            Download Abstract
          </Button>
        </Grid>
        <br />
        <Button color="secondary" variant="contained" to="/faculty/homepage" component={Link}>
          Back
        </Button>
      </div>
    </>
  );
}

export default BatchDetails;
