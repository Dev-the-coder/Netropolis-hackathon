import React from "react";
import Card from "react-bootstrap/Card";
import "../css/quest_card.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { API } from "../API";
import { useNavigate } from "react-router-dom";

const ApplicationCard = (props) => {
  const Navigate = useNavigate();
  const handleClick = () => {
    const apiUrl = { API } + "/quest/deleteapplication";
    const token = localStorage.getItem("netropolis_token");
    const headers = {
      Authorization: { token },
      "Content-Type": "application/json",
    };

    const payload = {
      appId: props.appId,
      // Add any other properties you need to include in the request body
    };

    axios
      .delete(apiUrl, {
        headers: headers,
        payload: payload,
      })
      .then((response) => {
        // console.log("Delete request successful", response.data);
        Navigate("/myapplications");
      })
      .catch((error) => {
        console.error("Error making delete request", error);
      });
  };

  return (
    <div className="col-4">
      <div class="card my-10" style={{ marginTop: "3rem" }}>
        <Card className="quest-card">
          <Card.Body>
            <Card.Title className="quest-card-title">
              <span>appId :</span>
              <a href="#">{props.id}</a>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Duration : </span>
              {props.duration}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Reward : </span>
              {props.rewards}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Location : </span>
              {props.location}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>status : </span>
              {props.status}
            </Card.Subtitle>
            <Button variant="contained" onClick={handleClick}>
              Withdraw application
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationCard;
