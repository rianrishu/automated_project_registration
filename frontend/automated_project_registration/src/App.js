import './App.css';
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
}

export default App;
