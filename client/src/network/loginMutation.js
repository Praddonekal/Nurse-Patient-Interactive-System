import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken, useAuthUserToken,useAuthRoleToken } from "../config/auth";

export const loginMutationGQL = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      id
      role
    }
  }
`;

export const useLoginMutation = () => {
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();
  const [__, setAuthUserToken, removeAuthUsertoken] = useAuthUserToken();
  const [___, setAuthRoleToken, removeAuthRoletoken] = useAuthRoleToken();

  const [mutation, mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: (data) => {
      setAuthToken(data.login.token);
      setAuthUserToken(data.login.id);
      setAuthRoleToken(data.login.role)
    },
  });

  // full login function
  const login = (user, password) => {
    removeAuthtoken();
    removeAuthUsertoken();
    removeAuthRoletoken();
    console.log(user, password);
    return mutation({
      variables: {
        username: user,
        password,
      },
    });
  };
  return [login, mutationResults];
};
