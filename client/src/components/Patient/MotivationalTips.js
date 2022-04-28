import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import NavBar from "../Nav/Nav";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

export const getHealthTips = gql`
  query findMotivationalTips($type: String!) {
    findMotivationalTips(type: $type) {
      tip
    }
  }
`;
export default function HealthTips(props) {
  useEffect(() => {
    setShowLoading(true);
    refetch().then(setShowLoading(false));
  }, []);
  const { data, loading, refetch } = useQuery(getHealthTips, {
    variables: { type: "Tip" },
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
            <h2 className="h2-style">Health Tips</h2>
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
                <thead className="thead-dark">
                  <tr>
                    <th>No</th>
                    <th>Health Tips</th>
                  </tr>
                </thead>

                {!loading && (
                  <tbody className="tr p-10">
                    {data.findMotivationalTips.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.tip}</td>
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
