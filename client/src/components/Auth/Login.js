import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import { useLoginMutation } from "../../network/loginMutation";
import { useNavigate } from "react-router-dom";
toast.configure();
export default function Login({ loading }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loginMutation, loginMutationResults] = useLoginMutation();
  const disableForm = loginMutationResults.loading || loading;
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username !== undefined && password !== undefined) {
      console.log(username, password);
      loginMutation(username, password);
    }
  };
  return (
    <FormLayout
      handleSubmit={handleSubmit}
      setUsername={setUsername}
      setPassword={setPassword}
      disableForm={disableForm}
      navigate={navigate}
    />
  );
}

function FormLayout(props) {
  return (
    <div className="Login">
      <Form onSubmit={props.handleSubmit}>
        <h1>Login</h1>
        <br />
        <Form.Group className="mb-3" size="lg" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onChange={(event) => props.setUsername(event.target.value)}
            required={true}
            disabled={props.disableForm}
          />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => props.setPassword(event.target.value)}
            required={true}
            disabled={props.disableForm}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="link" onClick={(event) => props.navigate("/register")}>
          Or register here
        </Button>
      </Form>
    </div>
  );
}
