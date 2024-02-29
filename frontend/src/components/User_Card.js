import React, { useState,useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../API";
import "../css/quest_card.css";

const UserCard = (props) => {
  const navigate = useNavigate();
  const [bg_color,setbgcolor] = useState("white");
  const status = props.status;
  // var bg_color = "red";
  useEffect(()=>{
    if(status==="accepted"){
      setbgcolor("green");
    }else if(status==="rejected"){
      setbgcolor("red");
    }
  },[]);
  



  const token = localStorage.getItem("netropolis_token");

  const handleAccept = () => {
    

    const data = {
      status: "accepted",
      quest_id: props.quest_id,
      user_id: props.user_id,
    };

    axios
      .put(`${API}/quest/questaction/`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // Handle successful response
        console.log("Update successful:", response.data);
        // navigate('/cm')
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating:", error);
      });
  };

  const handleReject = () => {
    const data = {
        status: "rejected",
        questId: props.quest_id,
        userId: props.user_id,
      };
  
      axios
        .put(`${API}/quest/questaction`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // Handle successful response
          console.log("Update successful:", response.data);
          navigate('/cm')
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating:", error);
          navigate('/cm')
        });
  };

  const handleComplete = () => {
    const data = {
        status: "completed",
        questId: props.quest_id,
        userId: props.user_id,
      };
  
      axios
        .put(`${API}/quest/questaction`, data, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // Handle successful response
          console.log("Update successful:", response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating:", error);
        });
  };

  return (
    <div className="col-6">
      <div className="card my-10" style={{ marginTop: "3rem" }}>
        <Card className="quest-card" style={{ backgroundColor: bg_color}}>
          <Card.Body>
            <Card.Title className="quest-card-title">
              <span>Name: </span>
              {props.name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Persona: </span>
              {props.persona}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Location: </span>
              {props.location}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Field of Specialization: </span>
              {props.field_of_specialization}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Email: </span>
              {props.email}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Completed Quest Tags: </span>
              {props.completed_quest_tags}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Active Quest: </span>
              {props.status}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Points: </span>
              {props.points}
            </Card.Subtitle>
            <div className="buttons-container">
              {(status!==("accepted")&&status!==("rejected"))?
              (<Button
                style={{ margin: "4px" }}
                variant="contained"
                onClick={handleAccept}
              >
                Accept
              </Button>):
              (<Button
                style={{ margin: "4px" }}
                variant="outlined" disabled
              >
                Accepted
              </Button>)}
              {(status!==("accepted")&&status!==("rejected"))?
              (<Button
                style={{ margin: "4px" }}
                variant="contained"
                onClick={handleReject}
              >
                Reject
              </Button>):
              (<Button
                style={{ margin: "4px" }}
                variant="outlined" disabled
              >
                Rejected
              </Button>)}
              {(status!==("rejected"))?
              (<Button
                style={{ margin: "4px" }}
                variant="contained"
                onClick={handleComplete}
              >
                Completed
              </Button>):
              (<Button
                style={{ margin: "4px" }}
                variant="outlined" disabled
              >
                Completed
              </Button>)}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UserCard;
