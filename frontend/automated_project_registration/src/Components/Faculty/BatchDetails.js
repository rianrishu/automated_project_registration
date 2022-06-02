import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "../../CSS/fullwd.css";
import Button  from "@material-ui/core/Button";

function BatchDetails() {
  return (
    <div id="login-box" className="login-box">
    <h2>Batch</h2>
    <form >
      <div className="user-box">
        Name:
      </div>
      <div className="user-box">
          Description:
      </div>
      <div className="user-box">
          Phase 0:
      </div>
      <div className="user-box">
          Phase 1:
      </div>
      <div className="user-box">
          Phase 2:
      </div>
      <div class="d-flex justify-content-around">
      <Link to="#" className='custom-btn btn-9'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Update
      </Link>
    </div>
    </form>
    <Button color="secondary" variant="contained" to="/admin/homepage" component={Link}>
            Back
          </Button>
  </div>
  );
}

export default BatchDetails;
