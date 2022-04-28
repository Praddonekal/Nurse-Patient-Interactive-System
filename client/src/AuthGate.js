import React from "react";
import { useAuthToken, useAuthUserToken } from "./config/auth";
import { gql, useQuery } from "@apollo/client";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";

const userQueryGQL = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      _id
      username
      role
    }
  }
`;

export const AuthGate = (props) => {
  const [authToken] = useAuthToken();
  const [authUserToken] = useAuthUserToken();

  const { loading, error, data } = useQuery(userQueryGQL, {
    variables: { userId: authUserToken },
    onCompleted: () => {
      console.log("query successful", data.user.username);
    },
  });

  if (data) {
    console.log("username output " + data.user.username);

  }

  if (data && authToken) {
    return props.children;
  }

  if (props.myProp) return <Register loading={loading} />;

  return <Login loading={loading} />;
  
};
