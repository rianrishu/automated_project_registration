import './App.css';
<<<<<<< HEAD
import {useState} from 'react'
function App() {
  const [credentials, setcred] = useState({ "Leader": "", "Student1": " ", "Student2": "", "class": "" ,"password":""})
    const handlesubmit=async (e)=>{
       e.preventDefault()
       console.log(credentials)
        const response = await fetch("http://localhost:8000/student/login/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "batch":credentials.Leader,"password":credentials.password })
          })
          // const json = await response.json();
    }
    const onchange = (e) => {
        setcred({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <form onSubmit={handlesubmit}>
   Team Leader:<input type="text" name="Leader" onChange={onchange} required/>
   {/* Student1:<input type="text" name="Student1" onChange={onchange} required/>
   Student2:<input type="text" name="Student2"  onChange={onchange} required/>
   Class:<input type="text" name="class" onChange={onchange}/> */}
   Password:<input type="password" name="password" onChange={onchange}/>
   <br/><button type="submit">Submit</button>
    </form>
  )
=======
import AdminLogin from './Components/Login/AdminLogin';
import UserLogin from './Components/Login/UserLogin';
import FacultyLogin from './Components/Login/FacultyLogin';
import Home from './Components/Home';
import AdminSignup from './Components/Signup/AdminSignup'
import FacultySignup from './Components/Signup/FacultySignup'
import UserSignup from './Components/Signup/UserSignup'
import {
  BrowserRouter,
 Switch,
  Route
} from "react-router-dom";
const App=()=> {
  return (
    <div>
    <BrowserRouter> 
     <div className='container'>
       <Switch> 
       <Route exact path="/">
          <Home/>
          </Route>
          <Route exact path="/faculty/login">
          <FacultyLogin/>
          </Route>
          <Route exact path="/user/login">
          <UserLogin/>
          </Route>
          <Route exact path="/admin/login">
          <AdminLogin/>
          </Route>
          {/* <Route exact path="/faculty/signup">
          <FacultySignup/>
          </Route> */}
          <Route exact path="/user/signup">
          <UserSignup/>
          </Route>
          {/* <Route exact path="/admin/signup">
          <AdminSignup/>
          </Route> */}
        </Switch> 
        </div>
        </BrowserRouter> 
        </div>
  );
>>>>>>> 449edab31681628d40ff443f9df892d54243a0d4
}

export default App;
