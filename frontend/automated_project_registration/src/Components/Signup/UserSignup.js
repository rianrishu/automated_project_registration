import React,{useState} from 'react'
import { Link } from 'react-router-dom'
function UserSignup() {
  const [credentials, setcred] = useState({ "Leader": "", "Student1": " ", "Student2": "", "section": "a" ,"password":""})
  const handlesubmit=async ()=>{
    console.log(credentials)
      const response = await fetch("http://localhost:8000/student/signin/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "student_leader":credentials.Leader, "student_1":credentials.Student1, "student_2":credentials.Student2, "section":credentials.section ,"password":credentials.password })
        })
        const json = await response.json();
  }
  const onchange = (e) => {
      setcred({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="login-box">
    <h2>SignUp</h2>
    <form >
      <div className="user-box">
        <input type="text" name="Leader"  onChange={onchange} required=""/>
        <label>Team Leader</label>
      </div>
      <div className="user-box">
        <input type="text" name="Student1"  onChange={onchange} required=""/>
        <label>Student 1</label>
      </div>
      <div className="user-box">
        <input type="text" name="Student2"  onChange={onchange} required=""/>
        <label>Student 2</label>
      </div>
      <div className="user-box">
        <select name="section" onChange={onchange}>
          <option name="A" value="a" default style={{"color":"black"}}>A</option>
          <option name="B" value="b" style={{"color":"black"}}>B</option>
          <option name="C" value="c" style={{"color":"black"}}>C</option>
        </select>
        <label style={{"color":"black","marginTop":"-18px","font-size": "12px"}}>Section</label>
      </div>
      <div className="user-box">
        <input type="password" name="password"  onChange={onchange} required=""/>
        <label>Password</label>
      </div>
      <Link to="/user/login" onClick={handlesubmit}>
        {/* <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit */}
        <button className='custom-btn btn-9' >Submit</button>
      </Link>
    </form>
  </div>
  )
}

export default UserSignup