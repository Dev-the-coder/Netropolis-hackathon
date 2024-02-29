import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Application.css";
import { API } from "../API";
import CMNavbar from "./CM_Navbar";
import UserCard from "./User_Card";

const Applications = () => {
  const [request, setRequest] = useState([]);
  // const request = [{}, {}, {}];
  const params = useParams();
  const questId = params.questId;
  const token = localStorage.getItem("netropolis_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/quest/requests/${questId}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        setRequest(response.data.requests);
        // setRequest(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [questId, token]);

  return (
    <>
      <CMNavbar />
      {request.length === 0 ? (
        <div className="applications">
          <h1>No users have applied for this quest</h1>
        </div>
      ) : (
        <>
          <h1 id="title">Quest Request</h1>
          <div className="container applicationcontainer">
            <div className="row applicationrow">
              {request.map((user) => {
                return (
                  <UserCard
                    quest_id={questId}
                    user_id={user.user_id}
                    name={user.username}
                    persona={user.persona}
                    email={user.email}
                    points={user.points}
                    field_of_specialization={user.field_of_specialization}
                    location={user.location}
                    status={user.accepted}
                    completed_quest_tags={user.completed_quest_tags}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Applications;
