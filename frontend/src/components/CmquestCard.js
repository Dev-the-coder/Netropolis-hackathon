import Card from "react-bootstrap/Card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/quest_card.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { API } from "../API";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const CMQuestCard = (props) => {
  const { loggedIn} = useContext(AuthContext);
  const Navigate = useNavigate();
  const id = props.id;

  const handleclick = ()=>{
    if(!loggedIn) {
      Navigate('/cmlogin')
    }
    else
    Navigate('/applications/'+id)
  }

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
              <span>Fee : </span>
              {props.fee}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Points : </span>
              {props.points}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Location : </span>
              {props.location}
            </Card.Subtitle>
            {/* <Link to={"/applications/" + id}>
              Applications <span>: {props.noofapplicants}</span>
            </Link> */}
            {/* <Button className="contained">Applications</Button> */}
            <button onClick={handleclick} type="button" class="btn btn-primary">Applications</button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CMQuestCard;
