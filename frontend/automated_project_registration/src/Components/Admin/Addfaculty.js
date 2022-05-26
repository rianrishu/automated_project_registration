import React,{useState,useContext} from 'react'
import { useLocation, useHistory,Link } from 'react-router-dom'
function Addfaculty() {
    const [credentials, setcred] = useState({ "username":" ","password":" "});
    const handlesubmit=async()=>{
   
        const response = await fetch("http://localhost:8000/student/login/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "username":credentials.batch,"password":credentials.password })
          })
          const json = await response.json();
          if(response.status==202){
          alert("Succesfullty Added");
     
          }
       else
       alert("Wrong Credentials");
    }
const onchange = (e) => {
      setcred({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <section id="loginpage">
    <div className="login-box">
  <h2>ADD Faculty</h2>
  <form onSubmit={handlesubmit}>
    <div className="user-box">
      <input type="text" name="username" id="username" onChange={onchange} required=""/>
      <label>User Name</label>
    </div>
    <div className="user-box">
      <input type="password" name="password" id="password" onChange={onchange} required=""/>
      <label>Password</label>
    </div>
    <Link to="#" onClick={handlesubmit}>
      <div className='d-flex justify-content-center'>
    <button className='custom-btn btn-9' >
      Submit
    </button>
    </div>
    </Link>
  </form>
</div>
</section>
  )
}

export default Addfaculty;