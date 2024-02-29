import React, { useState, useEffect } from "react";
import { API } from "../API";
import "../css/profile.css";
import axios from "axios";
import Navbar from "./navbar";

const CMProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual API endpoint you want to call
    const apiUrl = `${API}/commanager/getuser/`;

    // Replace 'your-access-token' with the actual access token you want to include in the header
    const accessToken = localStorage.getItem("netropolis_token");

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json", // Adjust content type as needed
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="user-profile">
        <h1>Your Profile</h1>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dob}
        </p>
        <p>
          <strong>Location:</strong> {user.location}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Area:</strong> {user.area}
        </p>
      </div>
    </>
  );
};

export default CMProfile;
