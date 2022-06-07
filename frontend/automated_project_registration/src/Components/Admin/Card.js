// import Card from "react-bootstrap/Card";
//import ReactDOM from "react-dom";
//import React from "react";
import { Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// import "./Cards.sass";
// import "./script.Babel";
import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation ,useHistory} from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

const Cards = (props) => {
  const { name, description,selected_by } = props.topic;
  const { ab } = props.disab;
  const [selected_fac,set_selected_fac]=useState("Pramod TC")
  const [faculty, setfaculty] = useState([]);
  let history=useHistory()
  const onchange=(e)=>{
      set_selected_fac(e.target.value)
  }
  useEffect(async () => {
    if (localStorage.getItem("token")) {
    const response = await fetch("http://localhost:8000/faculty/detail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setfaculty(json.msg);}
    else {
      alert("Login First");
      history.push("/");
    }
  }, []);
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <hr />
          <Typography variant="body2" color="text.secondary" className="btn-16">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <select name="faculty" onChange={onchange}>
          {faculty.map((element, index) => {
            return (
              <option key={index} value={element}>
                {element}
              </option>
            );
          })}
        </select>
        <button
          style={{ marginLeft: 100 }}
          className="custom-btn btn-15"
          onClick={() => props.select_topic(name,description,selected_by,selected_fac,"Accepted")}
          disabled={ab}
        >
          Select
        </button>
        <button
          style={{ marginLeft: 700 }}
          className="custom-btn btn-15"
          onClick={() => props.select_topic(name,description,selected_by,selected_fac,"Rejected")}
          disabled={ab}
        >
          Reject
        </button>
      </CardActions>
    </Card>
  );
};

export default Cards;
