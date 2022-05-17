import React,{useState,useContext, useEffect} from 'react'
import MiniContext from '../../Context/MiniContext';
import { Link, useLocation } from 'react-router-dom'
function UserNewTopic() {
    const [credentials, setcred] = useState({ "name":" ","description":" "})
    let location=useLocation();
    const [batch,setbatch]=useState(null)
   useEffect(()=>{
    if(location.state!=undefined)
    setbatch(location.state)
   },[])
    const handlesubmit=async()=>{
      console.log(credentials,batch)
        const response = await fetch("http://localhost:8000/student/addnewtopic/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name":credentials.name,"description":credentials.description,"selected_by":batch })
          })
          const json = await response.json();
          if(response.status==200){
        alert("Submitted Successfully")
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
       <textarea name="description" id="description" cols="30" rows="4"  onChange={onchange} />
        <label htmlFor="description">Description</label>
      </div>
      <Link to="#" className='custom-btn btn-9' onClick={handlesubmit}>
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