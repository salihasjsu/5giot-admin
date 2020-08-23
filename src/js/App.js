import React from "react";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../styles/App.css";
import Dashboard from "./dashboard";
import PrivateRoute from "./privateRoute";
import User from "./user";
import NetworkError from "./networkError";
import Signup from "./signup";
import ForgotPassword from "./forgotPassword";

function App() {
  return (
    <div className="pace-top">
      <Router>
        <Switch>
          <Route exact path="/" component={User} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/error" component={NetworkError} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgotPassword" component={ForgotPassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
