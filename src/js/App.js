import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import "../styles/App.css";
import User from "./user";
import { render } from "@testing-library/react";

function App() {
  return (
    <div className="App">
      <div className="App-header"></div>
      <Row>
        <Col sm={3}></Col>
        <Col sm={4} className="App-user">
          {" "}
          <User />
        </Col>
        <Col sm={3}></Col>
      </Row>
    </div>
  );
}

export default App;
