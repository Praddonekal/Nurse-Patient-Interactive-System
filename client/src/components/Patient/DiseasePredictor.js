import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavBar from "../Nav/Nav";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";

export const getHeartDiseasePredictor = gql`
  mutation heart(
    $age: Int!
    $sex: Int!
    $cp: Int!
    $trestbps: Int!
    $chol: Int!
    $fbs: Int!
    $restecg: Int!
    $thalach: Int!
    $exang: Int!
    $oldpeak: Float!
    $slope: Int!
    $ca: Int!
    $thal: Int!
  ) {
    heartDiseasePredict(
      age: $age
      sex: $sex
      cp: $cp
      trestbps: $trestbps
      chol: $chol
      fbs: $fbs
      restecg: $restecg
      thalach: $thalach
      exang: $exang
      oldpeak: $oldpeak
      slope: $slope
      ca: $ca
      thal: $thal
    ) {
      message
    }
  }
`;

function DiseasePredictor(props) {
  const [screen, setScreen] = useState("auth");
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState({
    title: "",
    probability: 0,
    bodyMsg: "",
  });

  const [modelAttr, setModelAttr] = useState({
    age: 0,
    cp: 0,
    sex: 1,
    trestbps: 120,
    chol: 200,
    thalach: 120,
    fbs: 0,
    exang: 0,
    restecg: 0,
    thalach: 0,
    exang: 0,
    oldpeak: 0,
    slope: 0,
    ca: 0,
    thal: 0,
  });
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [mutation, mutationResults] = useMutation(getHeartDiseasePredictor, {
    onCompleted: (data) => {
      setShowLoading(false);
      if (data.heartDiseasePredict.message < 0.33) {
        setResult({
          probability: data.heartDiseasePredict.message,
          title: "Good",
          bodyMsg: "You probably do not have heart disease!",
        });
      } else if (data.heartDiseasePredict.message < 0.66) {
        setResult({
          probability: data.heartDiseasePredict.message,
          title: "Unsure",
          bodyMsg: "You might have heart disease.",
        });
      } else {
        setResult({
          probability: data.heartDiseasePredict.message,
          title: "Warning",
          bodyMsg:
            "You probably have heart disease - we suggest you seek a medical professional.",
        });
      }
    },
  });

  const predictDiseaseProbability = (e) => {
    setShowLoading(true);
    setResult({
      probability: "",
      title: "",
      bodyMsg: "",
    });
    mutation({
      variables: {
        age: modelAttr.age,
        sex: modelAttr.age,
        cp: modelAttr.cp,
        trestbps: modelAttr.trestbps,
        chol: modelAttr.chol,
        fbs: modelAttr.fbs,
        restecg: modelAttr.restecg,
        thalach: modelAttr.thalach,
        exang: modelAttr.exang,
        oldpeak: modelAttr.oldpeak,
        slope: modelAttr.slope,
        ca: modelAttr.ca,
        thal: modelAttr.thal,
      },
    });

    e.preventDefault();

    openModal();
  };

  const onChange = (e) => {
    e.persist();
    setModelAttr({ ...modelAttr, [e.target.name]: +e.target.value });
  };

  const onCheckChange = (e) => {
    e.persist();
    setModelAttr({ ...modelAttr, [e.target.name]: e.target.checked ? 1 : 0 });
  };

  const onCheckChangeOpp = (e) => {
    e.persist();
    setModelAttr({ ...modelAttr, [e.target.name]: e.target.checked ? 0 : 1 });
  };

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="container-fluid col-6 div-right margins">
        <div className="span12 div-style p-10">
          <div className="bg-danger text-light title">
            <h2 className="h2-style">Disease Predictor</h2>
          </div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <div className="container-fluid margins">
            {showError && (
              <span>
                Something went wrong. Our developers are working to fix it!
              </span>
            )}
            <div className="bg-light">
              <Form onSubmit={predictDiseaseProbability}>
                <Form.Group>
                  <Form.Label>Check the following:</Form.Label>
                  <Form.Check
                    type="checkbox"
                    id="age"
                    name="age"
                    value={modelAttr.age === 1}
                    onChange={onCheckChange}
                    label="Older than 50 years old"
                  />
                  <Form.Check
                    type="checkbox"
                    id="cp"
                    name="cp"
                    value={modelAttr.cp === 1}
                    onChange={onCheckChange}
                    label="Have chest pains"
                  />
                  <Form.Check
                    type="checkbox"
                    id="fbs"
                    name="fbs"
                    value={modelAttr.fbs === 1}
                    onChange={onCheckChange}
                    label="Fasting blood sugar > 120 mg/dl"
                  />
                  <Form.Check
                    type="checkbox"
                    id="exang"
                    name="exang"
                    value={modelAttr.exang === 1}
                    onChange={onCheckChange}
                    label="Have angina from exercising"
                  />
                  <Form.Check
                    type="checkbox"
                    id="sex"
                    name="sex"
                    value={modelAttr.sex === 0}
                    onChange={onCheckChangeOpp}
                    label="Identify as a female"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Resting blood pressure (mmHg)</Form.Label>
                  <Form.Control
                    type="number"
                    name="trestbps"
                    id="trestbps"
                    min="0"
                    max="300"
                    value={modelAttr.trestbps}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Serum cholesterol in mg/dl</Form.Label>
                  <Form.Control
                    type="number"
                    name="chol"
                    id="chol"
                    value={modelAttr.chol}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Maximum heart rate achieved</Form.Label>
                  <Form.Control
                    type="number"
                    name="thalach"
                    id="thalach"
                    value={modelAttr.thalach}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="outline-danger col-6" type="submit">
                    Predict
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{result.title}</Modal.Title>
            </Modal.Header>
            {!showLoading ? (
              <Modal.Body>
                Your heart disease probability is around{" "}
                {Math.round(result.probability * 100)}%.
                <br /> {result.bodyMsg}
              </Modal.Body>
            ) : (
              <Modal.Body>Model Is Training. Please Wait....</Modal.Body>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default DiseasePredictor;
