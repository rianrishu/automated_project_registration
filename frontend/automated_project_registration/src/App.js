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
  Route,
  Redirect
} from "react-router-dom";
import { useLocation, useHistory,Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

 function App() {
  let location = useLocation();
  let history=useHistory();
  const [batch,setbatch]=useState()
  useEffect(()=>{
    // console.log(location.state)
    // setbatch(location.state)
  },[])
  
  const [room,setroom]=useState(null)
  function setRoomCode(){
    setroom(1)
  }
  function clearRoomCode(){
    setroom(null)
  }

  function goToHome(){
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
        <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  }

  useEffect(async ()=>{
    fetch('/student/user-in-homepage/')
    .then((response) => response.json())
    .then((data) => {
      console.log(data.code)
      setroom(data.code);
    })
  },[])

  return (
    <div>
      <UserHome/>
        </div>
  );
}

export default App;
