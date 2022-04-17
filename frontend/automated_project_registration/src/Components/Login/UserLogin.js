import React,{useState} from 'react'
import {Link} from 'react-router-dom'
function UserLogin() {
  const [credentials, setcred] = useState({ "batch":"","password":""})
  const handlesubmit=async()=>{
    console.log(credentials)
      const response = await fetch("http://localhost:8000/student/login/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "batch":credentials.batch,"password":credentials.password })
        })
        const json = await response.json();
  }
  const onchange = (e) => {
      setcred({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="login-box">
  <h2>Login</h2>
  <form>
    <div className="user-box">
      <input type="text" name="batch" onClick={onchange} required=""/>
      <label>BatchId</label>
    </div>
    <div className="user-box">
      <input type="password" name="password" onClick={onchange} required=""/>
      <label>Password</label>
    </div>
    <Link to="abc" onClick={handlesubmit}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </Link>
  </form>
  <Link to="/user/signup">Create New User</Link>
</div>
  )
}

export default UserLogin