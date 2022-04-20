import Card from "react-bootstrap/Card";
//import ReactDOM from "react-dom";
import React from "react";
import { Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// import "./Cards.sass";
// import "./script.Babel";


const Cards = (props) => {
  const {name,description,id}=props.topic
  return (
    <Card>
      <Card.Header as="h5">{name}</Card.Header>
      <Card.Body>
        {/* <Card.Title>{}</Card.Title> */}
        <Card.Text>
         {description}
        </Card.Text>
        <Button variant="primary">Select Topic</Button>
      </Card.Body>
    </Card>

  );
};


export default Cards;
