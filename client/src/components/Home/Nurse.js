import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import { useNavigate } from "react-router-dom";

import NavBar from "../Nav/Nav";
import "./Home.css";

export default function Nurse(props) {
  return (
    <div>
      <NavBar />
      <br></br>
      <div className="container-fluid col-6 justify-content-center margins">
        <div className="span12 div-style p-10">
          <div className="bg-danger text-light title">
            <h2 className="h2-style">Nurse Homepage</h2>
          </div>
          </div>
          </div>
    </div>
  );
}
