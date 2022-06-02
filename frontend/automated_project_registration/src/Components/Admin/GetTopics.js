import React, { useState, useEffect, useContext, useRef } from 'react'
import Table from './Table'
import '../../CSS/adgettopic.css'
import Loading  from '../../Loading'
function GetTopics() {
  const ref = useRef(null)
  const refClose = useRef(null)
  const [results, setresults] = useState([]);
  const [faculty, setfaculty] = useState([]);
  let [loading,setloading]=useState(true);
  const [obj, setobj] = useState({ "name": " ", "description": " ", "faculty": " ", "selected_by": " ","id":' ' })
  const getalltopics=async()=>{
    const response1 = await fetch("http://localhost:8000/admin1/getalltopics/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const json = await response1.json();
    json.msg.sort((a, b) => b.selected_by.localeCompare(a.selected_by))
    setresults(json.msg)
    setloading(false)
  }

  
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
    const json = await response.json();
if(response.status==200)
    alert( "Topic Updated Successfully")
    else
    alert( "Already 3 batches are assigned")
    getalltopics()
  }

  const handlechg = (e) => {
    console.log(e.target.value)
    setobj({ ...obj, [e.target.name]: e.target.value })
  }
  const updatetopic = (index,id) => {
    ref.current.click();
    setobj({ "name": results[index].name, "description": results[index].description, "faculty": results[index].faculty, "selected_by": results[index].selected_by,"id":id })
  }
  





  useEffect(async () => {
    getalltopics()
    const response = await fetch("http://localhost:8000/faculty/detail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json1 = await response.json();

    setfaculty(json1.msg);
  }, [])
  return (
    <section id="adgettopic">
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" >
            <div className="modal-header " style={{ "background": "antiquewhite" }}>
              <h5 className="modal-title" id="exampleModalLabel">Edit Topic</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ "background": "burlywood" }}>
              <form className="question  p-3 border-bottom" style={{ "background": "burlywood" }}>
              <div className="d-flex flex-row align-items-center question-title">
                  <h5 className="text-danger">Topic</h5>
                  <input value={obj.name} type="text" className="form-control"  placeholder='Enter Your Ques' onChange={handlechg} name="name" id="Ques" required></input>
                </div>
                <div className="d-flex flex-row align-items-center question-title">
                  <h5 className="text-danger">Description</h5>
                  <textarea value={obj.description} className="form-control" rows="5" placeholder='Enter Your Ques' onChange={handlechg} name="description" id="Ques" required></textarea>
                </div>
                <div className="ans ml-2  my-3">
                  <label className="radio">Faculty:
                    <select name="faculty" onChange={handlechg} className='mx-2' style={{ background: "burlywood" }} required>
          {faculty.map((element, index) => {
            return (
              <option key={index} value={element} selected={(element==obj.faculty)?true:false}>
                {element}
              </option>
            );
          })}
                    </select>
                  </label>
                </div>
                <div className="ans ml-2  my-3">
                  <label className="radio">Selected By:
                    <input value={obj.selected_by} name="selected_by" onChange={handlechg} className='mx-2' style={{ background: "burlywood" }} required/>
                  </label>
                </div>
               

              </form>
            </div>
            <div className="modal-footer" style={{ "background": "antiquewhite" }}>
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={obj.name.length < 1 || obj.description.length < 1 || obj.selected_by.length < 1|| obj.faculty.length <1 ||obj.selected_by.length > 2 } onClick={handleClick} type="button" className="btn btn-primary">Update Topic</button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-wrapper">
      {loading && <Loading/>}
        {!loading && <table className="fl-table">
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
            {results.map((res, index) => {
              return <tr key={index}>
                <Table res={res} index={index + 1} updatetopic={updatetopic}/>
              </tr>
            })}
          </tbody>
        </table>}
      </div>
    </section>
  )
}

export default GetTopics