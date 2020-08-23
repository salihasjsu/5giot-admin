import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Button, Col, Form, Row, Container, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo from "../images/logo.png";
import { saveTokens } from "./manageTokens";
import "../styles/login.css";
import line190 from "../images/login-bg/Line-190.png";
import line191 from "../images/login-bg/Line-191.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa, faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [user, setUser] = useState(initUser);
  const [error, setError] = useState({ isError: false, message: "" });
  let history = useHistory();
  function initUser() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      lastLogin: "",
      datOfBirth: "",
      isRemember: false,
      email: "",
    };
  }
  const [login] = useMutation(gql`
    mutation Login($userName: String!, $password: String!) {
      login(userName: $userName, password: $password) {
        refreshToken
        accessToken
      }
    }
  `);
  function validateForm() {
    return user.userName.length > 0 && user.password.length > 0;
  }
  async function submitLogin(e) {
    setError({ isError: false, message: "" });
    e.preventDefault();
    console.log(user);
    const loginDetails = { userName: user.userName, password: user.password };
    const { data, error } = await login({
      variables: loginDetails,
    });
    console.log(error);
    if (data && data.login) {
      saveTokens(data.login);
      history.push("/dashboard");
    } else {
      setError({ isError: true, message: "username or passowrd is incorrect" });
      setUser(initUser);
    }
  }

  return (
    <div className="login-cover login-bg overflow-scroll ">
      <Container>
        <Row style={{ marginLeft: "-72px" }}>
          <Col className="left-panel hidden-xs hidden-sm" md="8">
            <div className="banner-text"></div>
          </Col>
          <Col md={4} className="right-panel">
            <div className="login-content col-lg-11 offset-lg-1">
              <div className="form-group" style={{ marginTop: "120px" }}>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 login-heading-btn">
                  <img className="col-sm-3 -padding" src={line190} />
                  <span className="form-heading col-sm-3">5G IoT System</span>
                  <img className="col-sm-3 -padding" src={line191} />
                </div>
                <Form className="mt-40 margin-bottom-0">
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextEmail"
                    className="no-margin"
                  >
                    <Col sm="12" className="input">
                      <input
                        id="txtUsername"
                        type="text"
                        placeholder="Username"
                        value={user.userName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, userName: val };
                          });
                        }}
                      />
                      <span>
                        <i>
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ color: "#00ffcb" }}
                          />
                        </i>
                      </span>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPassword"
                    className="no-margin"
                  >
                    <Col sm="12" className="input">
                      <input
                        id="txtPassword"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, password: val };
                          });
                        }}
                      />
                      <span>
                        <i>
                          <FontAwesomeIcon
                            icon={faLock}
                            style={{ color: "#00ffcb" }}
                          />
                        </i>
                      </span>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="checkbox">
                    <Col sm="12">
                      <Form.Check
                        inline
                        label="Remember Me"
                        type="checkbox"
                        id="isRemember"
                        className="template"
                        checked={user.isRemember}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setUser((prevState) => {
                            return { ...prevState, isRemember: val };
                          });
                        }}
                      ></Form.Check>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="submit">
                    <Col sm="12">
                      <div className="login-buttons">
                        <Button
                          className="btn btn-block btn-success btn-lg login-btn"
                          type="submit"
                          disabled={!validateForm()}
                          onClick={submitLogin}
                        >
                          Login
                        </Button>
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="error message">
                    <Col sm="12">
                      <div
                        className={
                          error.isError ? "alert alert-danger" : "hidden"
                        }
                        role="alert"
                      >
                        {error.message}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="signup">
                    <Col sm="6" className="template">
                      New User?{" "}
                      <Button
                        variant="link"
                        style={{ paddingLeft: "0 !important" }}
                      >
                        Register Here
                      </Button>
                    </Col>
                    <Col sm="6" className="template">
                      <Button variant="link">Forgot Password</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
