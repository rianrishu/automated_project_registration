import React,{useState} from 'react'
import {Link} from "react-router-dom"
import  '../../CSS/Login.css'
function AdminLogin() {
    const [credentials, setcred] = useState({ "userid":"","password":""})
    const handlesubmit=async()=>{
        const response = await fetch("http://localhost:8000/student", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "userid":credentials.userid,"Password":credentials.password })
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
      <input type="text" name="userid"  onChange={onchange} required=""/>
      <label>UserID</label>
    </div>
    <div className="user-box">
      <input type="password" name="password"  onChange={onchange} required=""/>
      <label>Password</label>
    </div>
    <Link to="">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </Link>
  </form>
  <Link to="admin/signup">Create New Admin</Link>
</div>
  )
}

export default AdminLogin;