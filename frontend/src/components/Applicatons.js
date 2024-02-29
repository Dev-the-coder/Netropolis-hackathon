import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../css/Application.css";
import { API } from "../API";
import CMNavbar from "./CM_Navbar";
import UserCard from "./User_Card";

const Applications = () => {
  // const [request,setRequest] = useState([]);
  const request = [{ user_id: "A" }, { user_id: "B" }, { user_id: "C" }];
  const params = useParams();
  // console.log(params);
  const questId = params.questId;
  // console.log(questId);
  const token = localStorage.getItem("netropolis_token");
  const headers = {
    Authorization: { token },
    "Content-Type": "application/json",
  };
  // axios
  //   .get({ API } + "/quest/request/" + { questId }, { headers })
  //   .then((response) => {
  //     // Handle the response data
  //     setRequest(response.data);
  //     // console.log("Response:", response.data);
  //   })
  //   .catch((error) => {
  //     // Handle errors
  //     console.error("Error:", error);
  //   });

  return (
    <>
      <CMNavbar />
      {request.length === 0 ? (
        <div className="applications">
          <h1>No any user applied for this quest</h1>
        </div>
      ) : (
        <div className="applications">
          <h1>User applied for this quest</h1>
          <ul>
            {request.map((user) => (
              <div className="container">
                <div className="row">
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
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Applications;
