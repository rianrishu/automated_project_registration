import './App.css';
import AdminLogin from './Components/Login/AdminLogin';
import UserLogin from './Components/Login/UserLogin';
import FacultyLogin from './Components/Login/FacultyLogin';
import Home from './Components/Home';
import UserSignup from './Components/Signup/UserSignup'
import UserHome from './Components/User/UserHome'
import UserNewTopic from './Components/User/UserNewTopic';
import MiniState from './Context/MiniState';
import {
  BrowserRouter,
 Switch,
  Route
} from "react-router-dom";
import { useLocation, useHistory,Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
const App=()=> {
  let location = useLocation();
  const [batch,setbatch]=useState()
  useEffect(()=>{
  console.log(location.state)
    setbatch(location.state)
  },[])
  
  return (
    <div>
      <MiniState>
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
          <UserLogin />
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
          <Route exact path="/user/newtopic">
          <UserNewTopic/>
          </Route>
          <Route exact path="/user/homepage">
          <UserHome batch={batch}/>
          </Route>
          {/* <Route exact path="/admin/signup">
          <AdminSignup/>
          </Route> */}
        </Switch> 
        </div>
        </BrowserRouter> 

        </MiniState>
        </div>
  );
}

export default App;
