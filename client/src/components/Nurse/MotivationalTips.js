import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Form, Button } from "react-bootstrap";
import { withRouter, useNavigate } from "react-router-dom";
import NavBar from "../Nav/Nav";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";

export const createMotivationalTips = gql`
  mutation createMotivation($type: String!, $tip: String!) {
    createMotivationalTips(type: $type, tip: $tip) {
      message
    }
  }
`;

function MotivationalTips(props) {
  const [screen, setScreen] = useState("auth");
  const navigate = useNavigate();

  const [mutation, mutationResults] = useMutation(createMotivationalTips, {
    onCompleted: () => {
      navigate("/");
    },
  });

  const [tips, setTips] = useState({
    _id: "",
    type: "Tip",
    tip: "",
  });

  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const saveTip = (e) => {
    setShowLoading(true);
    e.preventDefault();

    mutation({
      variables: {
        type: tips.type,
        tip: tips.tip,
      },
    });
  };

  const onChange = (e) => {
    e.persist();
    setTips({ ...tips, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="container-fluid col-6 div-right margins">
        <div className="span12 div-style p-10">
          <div className="bg-danger text-light title">
            <h2 className="h2-style">Add Motivational Tips</h2>
          </div>

          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <div className="container-fluid margins">
            {showError && <span>There is something wrong...</span>}
            <div className="bg-light">
              <Form onSubmit={saveTip}>
                <Form.Group>
                  <Form.Label>Motivation Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    id="type"
                    onChange={onChange}
                    required
                  >
                    <option selected value="Tip">
                      Motivational Tips
                    </option>
                    <option value="Video">Motivational Video</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Motivational Content: </Form.Label>
                  <Form.Control
                    type="text"
                    name="tip"
                    id="tip"
                    placeholder="Enter your motivational content..."
                    onChange={onChange}
                    value={tips.tip}
                    required
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="outline-danger col-6" type="submit">
                    Save
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

export default MotivationalTips;
