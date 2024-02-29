import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "../css/myapplication.css";
import ApplicationCard from "./ApplicationCard";
import axios from "axios";
import { API } from "../API";
const Myapplication = () => {
  const [applied, setApplied] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("netropolis_token");
    const headers = {
      Authorization: { token },
      "Content-Type": "application/json",
    };
    axios
      .get({ API } + "/quest/applied/", { headers })
      .then((response) => {
        // Handle the response data
        setApplied(response.data);
        // console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);
  // var applicationId = ["10", "02", "03"];
  return (
    <>
      <Navbar />
      <div className="my-application-container ">
        <div>
          <h1>My application</h1>
        </div>
        <div>
          {applied.length > 0 ? (
            <div>
              {applied.map((id) => (
                <div key={id}>
                  <ApplicationCard appId={id} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="no-record">No records found</div>
              <div className="no-record">
                <Link to="/">search for the job &#8594;</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Myapplication;