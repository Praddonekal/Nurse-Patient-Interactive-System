import React, { useState } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../Nav/Nav";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useAuthUserToken } from "../../config/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const createEmergencyAlert = gql`
  mutation createEmergencyAlert($patient: String!, $message: String!) {
    createEmergencyAlert(patient: $patient, message: $message) {
      message
      status
    }
  }
`;

toast.configure();

export default function EmergencyAlert(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [alert, setAlert] = useState();
  const [authUserToken] = useAuthUserToken();
  const navigate = useNavigate();

  const [mutation, mutationResults] = useMutation(createEmergencyAlert, {
    onCompleted: () => {
      toast("Emergency Alert Created");
      navigate("/");
    },
  });

  const handleSubmit = async (e) => {
    setShowLoading(true);
    e.preventDefault();
    mutation({
      variables: {
        patient: authUserToken,
        message: alert,
      },
    });
  };

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="container-fluid col-6 div-right margins">
        <div className="span12 div-style p-10">
          <div className="bg-danger text-light title">
            <h2 className="h2-style">Emergency Alert!!!</h2>
          </div>

          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <div className="container-fluid margins">
            {showError && <span>There is something wrong...</span>}
            <div className="bg-light">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Alert Details: </Form.Label>
                  <Form.Control
                    type="text"
                    name="alert"
                    id="alert"
                    placeholder="Type your alert details here..."
                    onChange={(e) => setAlert(e.target.value)}
                    //value={tips.tip}
                    required
                  />
                </Form.Group>
                <br />
                <div className="text-center">
                  <Button variant="outline-danger col-6" type="submit">
                    Create
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
