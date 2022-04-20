import React,{useState} from 'react'
import { Link } from 'react-router-dom'
function UserNewTopic() {
    const [credentials, setcred] = useState({ "name":" ","description":" "})
    const handlesubmit=async()=>{
        console.log(credentials)
        const response = await fetch("http://localhost:8000/student/login/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name":credentials.name,"description":credentials.description })
          })
          const json = await response.json();
          if(response.status==202){
        
          }
       else
       alert("Wrong Credentials");
    }
    const onchange = (e) => {
        setcred({ ...credentials, [e.target.name]: e.target.value })
        
    }
  return (
    <div className="login-box">
    <h2>Add Your Topic</h2>
    <form >
      <div className="user-box">
        <input type="text" name="name"  onChange={onchange} required=""/>
        <label>Topic Name</label>
      </div>
      <div className="user-box">
       <textarea name="description"  cols="30" rows="4"  onChange={onchange} />
        <label style={{"color":"aqua","marginTop":"-18px","font-size": "12px"}}>Description</label>
      </div>
      <Link to="#" onClick={handlesubmit}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </Link>
    </form>
  </div>
  )
}

export default UserNewTopic