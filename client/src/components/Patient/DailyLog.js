import React, { useState } from "react";
import { Spinner, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../Nav/Nav";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import { useAuthUserToken } from "../../config/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const createDailyLog = gql`
  mutation createDailyLog(
    $pulse: String!
    $bodyTemperature: String!
    $bloodPressure: String!
    $respiratoryRate: String!
    $nurse: String!
    $patient: String!
    $weight: String!
  ) {
    createDailyLog(
      pulse: $pulse
      bodyTemperature: $bodyTemperature
      bloodPressure: $bloodPressure
      respiratoryRate: $respiratoryRate
      nurse: $nurse
      patient: $patient
      weight: $weight
    ) {
      message
      status
    }
  }
`;

export const getNurses = gql`
  query nurse($role: String!) {
    findUserByRole(role: $role) {
      _id
      role
      username
    }
  }
`;

toast.configure();

export default function DailyLog(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [authUserToken] = useAuthUserToken();
  const [dailyLog, setDailyLog] = useState({
    pulse: "",
    bodyTemperature: "",
    bloodPressure: "",
    respiratoryRate: "",
    nurse: "",
    patient: "",
    weight: "",
  });
  const navigate = useNavigate();
  const { data, loading } = useQuery(getNurses, {
    variables: {
      role: "Nurse",
    },
  });

  const [mutation, mutationResults] = useMutation(createDailyLog, {
    onCompleted: () => {
      toast("Daily Log Created");
      navigate("/");
    },
  });

  const handleSubmit = async (e) => {
    setShowLoading(true);
    e.preventDefault();
    console.log(authUserToken);
    console.log(dailyLog);
    mutation({
      variables: {
        pulse: dailyLog.pulse,
        bodyTemperature: dailyLog.bodyTemperature,
        bloodPressure: dailyLog.bloodPressure,
        respiratoryRate: dailyLog.respiratoryRate,
        nurse: dailyLog.nurse,
        patient: authUserToken,
        weight: dailyLog.weight,
      },
    });
  };

  const onChange = (e) => {
    e.persist();
    setDailyLog({ ...dailyLog, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="container-fluid col-6 div-right margins">
        <div className="span12 div-style p-10">
          <div className="bg-danger text-light title">
            <h2 className="h2-style">Create Daily Log</h2>
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
                  <Form.Label>Pulse (Per minute)</Form.Label>
                  <Form.Control
                    type="number"
                    name="pulse"
                    id="pulse"
                    placeholder="E.g. 80"
                    min="1"
                    step="1"
                    //value={vital.bodyTemperature}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Body Temperature (°C)</Form.Label>
                  <Form.Control
                    type="number"
                    name="bodyTemperature"
                    id="bodyTemperature"
                    placeholder="E.g. 36.5"
                    min="1"
                    step="0.1"
                    //value={vital.bodyTemperature}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                {/* <Form.Group>
                  <Form.Label>Heart Rate (per minute)</Form.Label>
                  <Form.Control
                    type="number"
                    name="heartRate"
                    id="heartRate"
                    placeholder="E.g. 80"
                    min="1"
                    step="1"
                    //value={vital.heartRate}
                    onChange={onChange}
                    required
                  />
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>
                    Blood Pressure (systolic/diastolic mm Hg)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="bloodPressure"
                    id="bloodPressure"
                    placeholder="E.g. 120/80"
                    pattern="^\d{2,3}\/\d{2,3}$"
                    //value={vital.bloodPressure}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Respiratory Rate (per minute)</Form.Label>
                  <Form.Control
                    type="number"
                    name="respiratoryRate"
                    id="respiratoryRate"
                    placeholder="E.g. 16"
                    min="1"
                    step="1"
                    //value={vital.respiratoryRate}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Weight (Lb)</Form.Label>
                  <Form.Control
                    type="number"
                    name="weight"
                    id="weight"
                    placeholder="E.g. 60"
                    min="1"
                    step="1"
                    //value={vital.respiratoryRate}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nurse</Form.Label>
                  <Form.Control
                    as="select"
                    name="nurse"
                    id="nurse"
                    //value={vital.patient}
                    onChange={onChange}
                    required
                  >
                    <option selected disabled value="">
                      Please select a nurse below
                    </option>
                    {!loading &&
                      data.findUserByRole.map((item, idx) => (
                        <option key={idx} value={item._id}>
                          {"Username: " +
                            item.username +
                            " | Role: " +
                            item.role +
                            " | ID: " +
                            item._id}
                        </option>
                      ))}
                  </Form.Control>
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
