import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "../styles/App.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
export default function User() {
  const [user, setUser] = useState(initUser);
  function initUser() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      lastLogin: "",
      datOfBirth: "",
      isRemember: false,
    };
  }

  function login(e) {
    e.preventDefault();
    console.log(user);
    setUser(initUser);
  }

  return (
    <div>
      <Col sm={12}>
        <Form className="form">
          <Form.Group as={Row}>
            <Col sm={12}>
              <img src={logo} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="username">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                placeholder="Email"
                value={user.userName}
                onChange={(e) => {
                  const val = e.target.value;
                  setUser((prevState) => {
                    return { ...prevState, userName: val };
                  });
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="password">
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => {
                  const val = e.target.value;
                  setUser((prevState) => {
                    return { ...prevState, password: val };
                  });
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="checkbox">
            <Row>
              <Col sm={3}></Col>
              <Col sm={9}>
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={user.isRemember}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setUser((prevState) => {
                      return { ...prevState, isRemember: val };
                    });
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={login}>
            Login
          </Button>
          <hr />
          <Row>
            <Col sm={12}>
              <Button variant="link">Forgot Your Password?</Button>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              New User? <Button variant="link">Register Here</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </div>
  );
}
