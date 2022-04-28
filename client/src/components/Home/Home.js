import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import { useNavigate } from "react-router-dom";

import NavBar from "../Nav/Nav";
import "./Home.css";

export default function Home(props) {
  return (
    <div>
      <NavBar />
      <h1 className="Home">Welcome to Medical Connect website</h1>
    </div>
  );
}
