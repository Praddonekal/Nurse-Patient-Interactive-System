import { Nav, Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLogout, useAuthRoleToken } from "../../config/auth";
import Logo from "../../logo192.png";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  let logout = useLogout();
  let navigate = useNavigate();
  const [authRoleToken] = useAuthRoleToken();

  return (
    <div>
      {authRoleToken === "Nurse" ? (
        <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
          <Container>
            <Navbar.Brand onClick={() => navigate("/")}>
              Medical Connect
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => navigate("/vitalSigns")}>
                  Vital Signs
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => navigate("/vitalHistory")}>
                  Vital History
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => navigate("/patientDailyLogs")}>
                  Patient Daily Logs
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => navigate("/motivationalTipsView")}>
                  Add Motivational Tips
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => navigate("/emergencyAlertHistory")}>
                  Emergency Alert History
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
          <Container>
            <Navbar.Brand onClick={() => navigate("/")}>
              Medical Connect
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => navigate("/createalert")}>
                  Create Alert
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/createdailylog")}>
                  Create Daily Log
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/tips")}>
                  Health Tips
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/diseasePredictor")}>
                  Disease Predictor
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}
