import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

function Auth() {
  const { loading, data } = useQuery(gql`
    query {
      loggedInUser {
        email
        userName
      }
    }
  `);

  if (loading) return <div>asda</div>;

  if (data.loggedInUser) return <div>user logged in</div>;

  return (
    <p>
      <a href="/sign-in">Sign in</a>
    </p>
  );
}
export default Auth;
