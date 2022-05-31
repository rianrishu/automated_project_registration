import "./App.css";
import React from "react";
import AdminLogin from "./Components/Login/AdminLogin";
import UserLogin from "./Components/Login/UserLogin";
import FacultyLogin from "./Components/Login/FacultyLogin";
import Home from "./Components/Home";
import AdminHome from "./Components/Admin/AdminHome";
import FacultyHome from "./Components/Faculty/FacultyHome"
import UserSignup from "./Components/Signup/UserSignup";
import UserHome from "./Components/User/UserHome";
import UserNewTopic from "./Components/User/UserNewTopic";
import MiniState from "./Context/MiniState";
import GetTopics from "./Components/Admin/GetTopics";
import Addfaculty from "./Components/Admin/Addfaculty"
import AddTopic from "./Components/Admin/AddTopic";
import FacultyAddTopic from "./Components/Faculty/FacultyAddTopic"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

function App() {

  return (
    <div>
      <MiniState>
        <BrowserRouter>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/faculty/login">
                <FacultyLogin />
              </Route>
              <Route exact path="/user/login">
                <UserLogin />
              </Route>
              <Route exact path="/admin/login">
                <AdminLogin />
              </Route>
              {/* <Route exact path="/faculty/signup">
          <FacultySignup/>
          </Route> */}
              <Route exact path="/user/signup">
                <UserSignup />
              </Route>
              <Route exact path="/user/newtopic">
                <UserNewTopic />
              </Route>
              <Route path="/user/homepage">
                <UserHome />
              </Route>
              <Route path="/admin/homepage">
                <AdminHome />
              </Route>
              <Route path="/admin/addfaculty">
                <Addfaculty />
              </Route>
              <Route path="/admin/addtopic">
                <AddTopic />
              </Route>
              <Route path="/admin/gettopics">
                <GetTopics />
              </Route>
              <Route path="/faculty/homepage">
                <FacultyHome />
              </Route>
              <Route path="/faculty/addtopic">
                <FacultyAddTopic />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </MiniState>
    </div>
  );
}

export default App;
