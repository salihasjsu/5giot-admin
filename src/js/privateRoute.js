import { gql, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Redirect, Route } from "react-router-dom";
//import gql from "graphql-tag";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, data } = useQuery(gql`
    query {
      loggedInUser {
        email
        userName
      }
    }
  `);
  if (loading) return "Loading...";

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        data.loggedInUser ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
