import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../css/Application.css";
import { API } from "../API";
import CMNavbar from "./CM_Navbar";

const Applications = () => {
  const [request,setRequest] = useState([]);
  const params = useParams();
  // console.log(params);
  const questId = params.questId;
  // console.log(questId);
  const token = localStorage.getItem("netropolis_token");
  const headers = {
    Authorization: { token },
    "Content-Type": "application/json",
  };
  axios
    .get({ API } + "/quest/request/" + { questId }, { headers })
    .then((response) => {
      // Handle the response data
      setRequest(response.data);
      // console.log("Response:", response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });

  
  return (
    <>
      <CMNavbar/>
      {request.length === 0 ? (
        <div className="applications">
          <h1>No any user applied for this quest</h1>
        </div>
      ) : (
        <div className="applications">
          <h1>User applied for this quest</h1>
          <ul>
            {request.map((user) => (
              <li>{user}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Applications;
