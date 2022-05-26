// import Card from "react-bootstrap/Card";
//import ReactDOM from "react-dom";
//import React from "react";
import { Button } from "react-bootstrap";

// import "bootstrap/dist/css/bootstrap.css";
// import "./Cards.sass";
// import "./script.Babel";
import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

const Cards = (props) => {
  const { name, description, id } = props.topic;
  const { ab } = props.disab;
  const [faculty, setfaculty] = useState([]);
  useEffect(async () => {
    const response = await fetch("http://localhost:8000/faculty/detail/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setfaculty(json.msg);
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
      <div className="d-flex justify-content-end">
        <button
          className="custom-btn btn-15"
          onClick={() => props.select_topic(id)}
          disabled={ab}
        >
          Select
        </button>
        </div>
      </CardActions>
    </Card>
  );
};

export default Cards;
