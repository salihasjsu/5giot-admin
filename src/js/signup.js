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
import MaskedInput from "react-text-mask";
import emailMask from "react-text-mask";
export default function Signup() {
  const [user, setUser] = useState(initUser);
  const [error, setError] = useState({ isError: false, message: "" });
  let history = useHistory();
  function initUser() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      datOfBirth: "",
      isRemember: false,
      email: "",
      contact: "",
      address: "",
      role: "admin",
    };
  }
  const [signup] = useMutation(gql`
    mutation addUser($userName: String!, $password: String!) {
      login(userName: $userName, password: $password) {
        refreshToken
        accessToken
      }
    }
  `);
  function validateForm() {
    return (
      user.userName.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0 &&
      user.contact.length > 0 &&
      user.address.length > 0 &&
      user.firstName.length > 0 &&
      user.lastName.length > 0
    );
  }
  async function submitUser(e) {
    setError({ isError: false, message: "" });
    e.preventDefault();
    console.log(user);
    if (!validateForm()) {
      setError({ isError: true, message: "All fields are required" });
      return;
    }

    /* const loginDetails = { userName: user.userName, password: user.password };
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
    }*/
  }
  function gotoLogin() {
    history.push("/");
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
                  <span
                    style={{
                      color: "#00ffcb",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Register User
                  </span>
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
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextEmail"
                    className="no-margin"
                  >
                    <Col sm="12" className="input">
                      <MaskedInput
                        mask={[/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/]}
                        id="txtEMail"
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, email: val };
                          });
                        }}
                      />
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
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextEmail"
                    className="no-margin"
                  >
                    <Col sm="12" className="input">
                      <input
                        id="txtFirstname"
                        type="text"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, firstName: val };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextEmail"
                    className="no-margin"
                  >
                    <Col sm="12" className="input">
                      <input
                        id="txtLastname"
                        type="text"
                        placeholder="Last Name"
                        value={user.lastName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, lastName: val };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextContact"
                    className="no-margin"
                  >
                    <Col sm="12" className="input">
                      <MaskedInput
                        mask={[
                          "(",
                          /[1-9]/,
                          /\d/,
                          /\d/,
                          ")",
                          " ",
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                        id="txtcontact"
                        type="text"
                        placeholder="Contact"
                        value={user.contact}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, contact: val };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formPlaintextAddress"
                    className="no-margin"
                  >
                    <Col sm="12" className="input">
                      <input
                        id="txtFirstname"
                        type="text"
                        placeholder="Address"
                        value={user.address}
                        onChange={(e) => {
                          const val = e.target.value;
                          setUser((prevState) => {
                            return { ...prevState, address: val };
                          });
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="submit">
                    <Col sm="12">
                      <div className="login-buttons">
                        <Button
                          className="btn btn-block btn-success btn-lg login-btn"
                          type="submit"
                          onClick={submitUser}
                        >
                          Signup
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
                    <Col sm="12" className="template">
                      Already have Account?{" "}
                      <Button
                        variant="link"
                        style={{ paddingLeft: "0 !important" }}
                        onClick={gotoLogin}
                      >
                        Login Here
                      </Button>
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
