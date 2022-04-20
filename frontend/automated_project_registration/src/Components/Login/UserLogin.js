import React,{useState,useContext} from 'react'
import { useLocation, useHistory,Link } from 'react-router-dom'
import MiniContext from '../../Context/MiniContext';
function UserLogin({useCallbackUpdate}) {
  const history=useHistory();
  const context=useContext(MiniContext);
  const {batch,setbatch}=context;
  const [credentials, setcred] = useState({ "batch":" ","password":" "})
  const handlesubmit=async()=>{
   
      const response = await fetch("http://localhost:8000/student/login/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "batch":credentials.batch,"password":credentials.password })
        })
        const json = await response.json();
        if(response.status==202){
         setbatch(credentials.batch)
     history.push({
      pathname: '/user/homepage',
      search: '?query=abc',
      state: { batch:credentials.batch}
    })
    // useCallbackUpdate(credentials.batch)
        }
     else
     alert("Wrong Credentials");
  }
  const onchange = (e) => {
      setcred({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <div className="login-box">
  <h2>Login</h2>
  <form onSubmit={handlesubmit}>
    <div className="user-box">
      <input type="text" name="batch" id="batch" onChange={onchange} required=""/>
      <label>BatchId</label>
    </div>
    <div className="user-box">
      <input type="password" name="password" id="password" onChange={onchange} required=""/>
      <label>Password</label>
    </div>
    <Link to="#" onClick={handlesubmit}>
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