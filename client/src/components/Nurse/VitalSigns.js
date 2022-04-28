import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Form, Button } from "react-bootstrap";
import { withRouter,useNavigate } from "react-router-dom";
import NavBar from "../Nav/Nav";
import {gql} from "@apollo/client";
import { useQuery,useMutation } from "@apollo/client";
import { useAuthToken, useAuthUserToken,useAuthRoleToken } from "../../config/auth";

export const getPatients = gql`
query patient($role: String!) {
    findUserByRole(role: $role) {
      _id,
      role,
      username
    }
  }
`;

export const createClinicalVisit = gql`
mutation clinicalVisit($bodyTemperature:Int!, $heartRate:Int!, $bloodPressure:String!,$respiratoryRate: Int!,$nurse: String,$patient: String) {
    createClinicalVisit(bodyTemperature:$bodyTemperature, heartRate:$heartRate, bloodPressure:$bloodPressure,respiratoryRate:$respiratoryRate,nurse:$nurse,patient:$patient) {
      message
    }
  }
`;


function VitalSigns(props) {
    const [screen, setScreen] = useState("auth");
    const navigate = useNavigate();
    const [authUserToken] = useAuthUserToken();
    
    const {data,loading} = useQuery(getPatients,{
        variables: {
            role:'Patient'
        }
    });

    const [mutation, mutationResults] = useMutation(createClinicalVisit, {
        onCompleted: (data) => {
          navigate("/vitalHistory");
        },
      });

    console.log(data)
    

    const nurseId = authUserToken;

    const [vital, setVital] = useState({
        _id: "",
        bodyTemperature: "",
        heartRate: "",
        bloodPressure: "",
        respiratoryRate: "",
        nurse: "",
        patient: "",
    });

    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const saveVital = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            bodyTemperature: vital.bodyTemperature,
            heartRate: vital.heartRate,
            bloodPressure: vital.bloodPressure,
            respiratoryRate: vital.respiratoryRate,
            nurse: nurseId,
            patient: vital.patient,
        };

        mutation({
            variables: {
                bodyTemperature: parseInt(data.bodyTemperature),
                heartRate: parseInt(data.heartRate),
                bloodPressure: data.bloodPressure,
                respiratoryRate: parseInt(data.respiratoryRate),
                nurse: data.nurse,
                patient: data.patient,
            },
          });
    };

    const onChange = (e) => {
        e.persist();
        setVital({ ...vital, [e.target.name]: e.target.value });
    };

    return (
        <div>
        <NavBar />
        <br></br>
        <div className="container-fluid col-6 div-right margins">
            <div className="span12 div-style p-10">
                <div className="bg-danger text-light title">
                    <h2 className="h2-style">Add Vital Signs</h2>
                </div>

                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}
                <div className="container-fluid margins">
                    {showError && (
                        <span>
                        There is something wrong...
                        </span>
                    )}
                    <div className="bg-light">
                        <Form onSubmit={saveVital}>
                            <Form.Group>
                                <Form.Label>Body Temperature (°C)</Form.Label>
                                <Form.Control
                                type="number"
                                name="bodyTemperature"
                                id="bodyTemperature"
                                placeholder="E.g. 36.5"
                                min="1"
                                step="0.1"
                                value={vital.bodyTemperature}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Heart Rate (per minute)</Form.Label>
                                <Form.Control
                                type="number"
                                name="heartRate"
                                id="heartRate"
                                placeholder="E.g. 80"
                                min="1"
                                step="1"
                                value={vital.heartRate}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Blood Pressure (systolic/diastolic mm Hg)</Form.Label>
                                <Form.Control
                                type="text"
                                name="bloodPressure"
                                id="bloodPressure"
                                placeholder="E.g. 120/80"
                                pattern="^\d{2,3}\/\d{2,3}$"
                                value={vital.bloodPressure}
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
                                value={vital.respiratoryRate}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Patient</Form.Label>
                                <Form.Control as="select"
                                name="patient"
                                id="patient"
                                value={vital.patient}
                                onChange={onChange}
                                required> 
                                <option selected disabled value="">Please select a patient below</option>
                                {!loading && data.findUserByRole.map((item, idx) => (
                                    <option
                                        key={idx}
                                        value={item._id}
                                    >
                                    {
                                        "Username: " +
                                        item.username + 
                                        " | Role: " +
                                        item.role +
                                        " | ID: " + 
                                        item._id
                                    }
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

export default (VitalSigns);