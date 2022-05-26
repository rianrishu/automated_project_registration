import React,{useState,useContext, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
function FacultyAddTopic() {
    const [credentials, setcred] = useState({ "name":" ","description":" ","faculty":""})
    let location=useLocation();
    const [faculty,setfaculty]=useState("")
   useEffect(()=>{
    if(location.state!=undefined)
    setfaculty(location.state)
   },[])
  
    const handlesubmit=async()=>{
        const response = await fetch("http://localhost:8000/admin1/addnewtopic/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name":credentials.name,"description":credentials.description,"selected_by":"","faculty":faculty })
          })
          const json = await response.json();
          if(response.status==200){
           alert('submitted successfully')
           window.location.reload(false);
          }
       else
       alert("Wrong Credentials");
    }
    const onchange = (e) => {
        setcred({ ...credentials, [e.target.name]: e.target.value })
        
    }
  return (
    <div className="login-box">
    <h2>Add Topic</h2>
    <form >
      <div className="user-box">
        <input type="text" name="name"  onChange={onchange} required=""/>
        <label>Topic Name</label>
      </div>
      <div className="user-box">
       <textarea name="description" id="description" cols="30" rows="4"  onChange={onchange} />
        <label htmlFor="description">Description</label>
      </div>
      <div class="d-flex justify-content-around">
      <Link to="#" className='custom-btn btn-9' onClick={handlesubmit}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </Link>
    </div>
    </form>
  </div>
  )
}

export default FacultyAddTopic