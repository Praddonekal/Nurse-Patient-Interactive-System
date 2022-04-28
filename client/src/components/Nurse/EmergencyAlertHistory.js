import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavBar from "../Nav/Nav";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import {
  useAuthToken,
  useAuthUserToken,
  useAuthRoleToken,
} from "../../config/auth";

export const getAlertHistory = gql`
  query alert {
    findAlerts {
      _id
      message
      patient
      unread
      created
    }
  }
`;

function EmergencyAlertHistory(props) {
  const { data, loading } = useQuery(getAlertHistory);
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  console.log(data);

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="container-fluid col-10 div-right margins">
        <div className="span12 div-style p-10">
          <div className="bg-danger text-light title">
            <h2 className="h2-style">Emergency Alert History</h2>
          </div>

          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}

          <div className="container-fluid margins">
            {showError && <span>There is something wrong...</span>}

            <div className="mb-20">
              <table className="table table-danger">
                <thead className="thead-dark">
                  <tr>
                    <th>No.</th>
                    <th>Message</th>
                    <th>Patient ID</th>
                    <th>Date</th>
                  </tr>
                </thead>

                {!loading && (
                  <tbody className="tr p-10">
                    {data.findAlerts.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.message}</td>
                          <td>{item.patient}</td>
                          <td>{item.created}</td>
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

export default EmergencyAlertHistory;
