import React from "react";
import Card from "react-bootstrap/Card";
import "../css/quest_card.css"
import Button from '@mui/material/Button';

const ApplicationCard = (props)=>{

    return (
        <div className="col-4">
          <div class="card my-10" style={{ marginTop: "3rem" }}>
            <Card className="quest-card">
              <Card.Body>
                <Card.Title className="quest-card-title"><span>appId :</span><a href="#">{props.id}</a></Card.Title>
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
               <Button variant="contained" href="#contained-buttons">Withdraw application</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      );
}

export  default ApplicationCard