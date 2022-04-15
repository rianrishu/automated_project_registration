// import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
function App() {
  const [credentials, setcred] = useState({ "Leader": "", "Student1": " ", "Student2": "", "class": "" ,"password":""})
    const handlesubmit=async (e)=>{
       e.preventDefault()
       console.log(credentials)
        const response = await fetch("http://localhost:8000/student/signin/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "student_leader":credentials.Leader, 
            "student_1":credentials.Student1, "student_2":credentials.Student2, 
            "section":credentials.class ,"password":credentials.password })
          })
          // const json = await response.json();
    }
    const onchange = (e) => {
        setcred({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <form onSubmit={handlesubmit}>
   Team Leader:<input type="text" name="Leader" onChange={onchange} required/>
   Student1:<input type="text" name="Student1" onChange={onchange} required/>
   Student2:<input type="text" name="Student2"  onChange={onchange} required/>
   Class:<input type="text" name="class" onChange={onchange}/>
   Password:<input type="password" name="password" onChange={onchange}/>
   <br/><button type="submit">Submit</button>
    </form>
  )
}

export default App;
