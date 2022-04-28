import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

toast.configure();

export const registerMutationGQL = gql`
  mutation CreateUser($username: String!, $password: String!, $role: String!) {
    createUser(username: $username, password: $password, role: $role) {
      message
      status
    }
  }
`;

export default function Register(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("Nurse");
  const navigate = useNavigate();

  const [mutation, mutationResults] = useMutation(registerMutationGQL, {
    onCompleted: (data) => {
      navigate("/");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(role);
    mutation({
      variables: {
        username: username,
        password: password,
        role: role,
      },
    });
  };
  return (
    <div className="Register">
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <br></br>
        <Form.Group as={Col} controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onChange={(event) => setUsername(event.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required={true}
          >
            <option value="Nurse">Nurse</option>
            <option value="Patient">Patient</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
        <br></br>
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </Form>
    </div>
  );
}
