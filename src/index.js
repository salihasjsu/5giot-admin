import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import Render from "react-dom";
import "./index.css";
import App from "./js/App";
import { getTokens, saveTokens } from "./js/manageTokens";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { onError } from "@apollo/client/link/error";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Redirect } from "react-router-dom";
import NetworkError from "./js/networkError";

const client = new ApolloClient({
  uri: "http://localhost:9000/graphql",
  fetch: async (uri, options) => {
    const initialRequest = await fetch(uri, options);
    const { headers } = initialRequest;
    const accessToken = headers.get("x-access-token");
    const refreshToken = headers.get("x-refresh-token");
    if (accessToken && refreshToken) {
      saveTokens({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
    return initialRequest;
  },
  request: (operation) => {
    const tokens = getTokens();
    console.log("TOKENS" + tokens);
    if (tokens && tokens.accessToken) {
      operation.setContext({
        headers: {
          "x-access-token": tokens.accessToken,
          "x-refresh-token": tokens.refreshToken,
        },
      });
    }
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      return <NetworkError />;
    }
  },
  cache: new InMemoryCache(),
});
/*
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}*/
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
