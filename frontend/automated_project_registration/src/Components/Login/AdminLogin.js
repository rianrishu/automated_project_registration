import React,{useState} from 'react'
import {Link,useHistory} from "react-router-dom"

function AdminLogin() {
  let history=useHistory()
    const [credentials, setcred] = useState({ "userid":"","password":""})
    const handlesubmit=async()=>{
        const response = await fetch("http://localhost:8000/admin/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "userid":credentials.userid,"Password":credentials.password })
          })
          const json = await response.json();
          if(response.status==202){
            history.push({
              pathname: '/admin/homepage'
            })
          }
          else
          alert("Wrong Credentials");
        }
        const onchange = (e) => {
      console.log("abc")
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
  {/* <Link to="admin/signup">Create New Admin</Link> */}
</div>
  )
}

export default AdminLogin;