import Card from "react-bootstrap/Card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/quest_card.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { API } from "../API";

const CMQuestCard = (props) => {
  const Navigate = useNavigate();
  const id = props.id;
  const handleClick = () => {
    // console.log("hii");
    const payload = {
      quest_id: props.id,
    };

    const token = localStorage.getItem("netropolis_token");
    axios
      .post({ API } + "/quest/register", payload, {
        headers: {
          Authorization: { token },
          "Content-Type": "application/json",
        },
      })
      .then(Navigate("/myapplications"))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="col-4">
      <div class="card my-10" style={{ marginTop: "3rem" }}>
        <Card className="quest-card">
          <Card.Body>
            <Card.Title className="quest-card-title">
              <a href="#">{props.title}</a>
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
              <span>Points : </span>
              {props.points}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Location : </span>
              {props.location}
            </Card.Subtitle>
            <Link to={"/applications/" + id}>
              Applications <span>: {props.noofapplicants}</span>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CMQuestCard;
