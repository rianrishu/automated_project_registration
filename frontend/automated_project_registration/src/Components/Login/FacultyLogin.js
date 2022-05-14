import React,{useState} from 'react'
import {Link} from 'react-router-dom'
function FacultyLogin() {
  const [credentials, setcred] = useState({ "userid":"","password":""})
    const handlesubmit=async()=>{
        const response = await fetch("http://localhost:8000/student", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "UserID":credentials.userid,"Password":credentials.password })
          })
          const json = await response.json();
    }
    const onchange = (e) => {
        setcred({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className="login-box">
  <h2>Login</h2>
  <form onSubmit={handlesubmit}>
    <div className="user-box">
      <input type="text" name="userid"   onChange={onchange} required=""/>
      <label>UserId</label>
    </div>
    <div className="user-box">
      <input type="password" name="password"   onChange={onchange} required=""/>
      <label>Password</label>
    </div>
    <Link to="abc">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </Link>
  </form>
  {/* <Link to="faculty/signup">Create New Faculty</Link> */}
</div>
  )
}

export default FacultyLogin