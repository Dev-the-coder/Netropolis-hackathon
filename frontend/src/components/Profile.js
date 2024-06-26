import React, { useState, useEffect } from "react";
import { API } from "../API";
import "../css/profile.css";
import axios from "axios";
import Navbar from "./navbar";

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual API endpoint you want to call
    const apiUrl = `${API}/users/getuser`;

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
          <strong>Persona:</strong> {user.persona}
        </p>
        <p>
          <strong>Location:</strong> {user.location}
        </p>
        <p>
          <strong>Field of Specialization:</strong>{" "}
          {user.field_of_specialization}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Completed Quest Tags:</strong>
          {user.completed_quest_tags}
        </p>
        <p>
          <strong>Active Quest:</strong> {user.active_quest ? "Yes" : "No"}
        </p>
        <p>
          <strong>Points:</strong> {user.points}
        </p>
      </div>
    </>
  );
};

export default UserProfile;
