import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import NavBar from "../Nav/Nav";
import "./Home.css";
import ReactPlayer from "react-player";

export const getHealthTips = gql`
  query findMotivationalTips($type: String!) {
    findMotivationalTips(type: $type) {
      tip
    }
  }
`;
//import { useNavigate } from "react-router-dom";

export default function Patient(props) {
  useEffect(() => {
    setShowLoading(true);
    refetch().then(setShowLoading(false));
  }, []);
  const { data, loading, refetch } = useQuery(getHealthTips, {
    variables: { type: "Video" },
  });
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  return (
    <div>
      <NavBar />
      <br />
      <div className="container-fluid col-6 justify-content-center margins">
        <div className="span12 div-style p-10">
          <div className="bg-danger text-light title">
            <h2 className="h2-style">Motivational Videos</h2>
          </div>
      
      
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}

          <div className="container-fluid margins">
            {showError && <span>There is something wrong...</span>}
            <div className="p-10">
              <table className="table table-danger">
                {!loading && (
                  <tbody className="tr p-10">
                    {data.findMotivationalTips.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <div>
                            <ReactPlayer
                              className="Home"
                              width="480px"
                              height="240px"
                              controls
                              url={item.tip}
                            ></ReactPlayer>
                          </div>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
