import React,{useState,useContext,useRef,useEffect} from 'react'
import { useLocation, useHistory,Link } from 'react-router-dom'
import Navbar from './Navbar'
function Update_Password() {
    let ref=useRef(null)
    let location=useLocation()
 const [fac,setfac]=useState()
    const [credentials, setcred] = useState({"password":" ","conpassword":" "})
  const handlesubmit=async(e)=>{
    // e.preventDefault();
    ref.clear()
     if(credentials.conpassword!==credentials.password)
     {
        alert('Password doesn\'t match ')
        return 
     }
      const response = await fetch("http://localhost:8000/faculty/update-password/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ "userid":fac,"password":credentials.password })
        })
        const json = await response.json();
      
        if(response.status===202){
          alert('Password Updated Successfylly')
        }
     else
     alert("Wrong Credentials");
  }
  useEffect(() => {
   if(location.state!==undefined)
   {
     setfac(location.state.userid)
   }
  }, [])
  
  const onchange = (e) => {
      setcred({ ...credentials, [e.target.name]: e.target.value })
     
  }
  return (
    <>
    <Navbar faculty={fac}/>
    <section id="loginpage">
    <div className="login-box">
  <h2>Update Password</h2>
  <form ref={ref} onSubmit={handlesubmit}>
    <div className="user-box">
      <input type="password" name="password" id="password" onChange={onchange} required=""/>
      <label>Password</label>
    </div>
    <div className="user-box">
      <input type="password" name="conpassword" id="conpassword" onChange={onchange} required=""/>
      <label>Confirm Password</label>
    </div>
    <Link to="#" onClick={handlesubmit}>
      <div className='d-flex justify-content-center'>
    <button className='custom-btn btn-9' >
      Update
    </button>
    </div>
    </Link>
  </form>
  
</div>
</section>
</>
  )
}

export default Update_Password