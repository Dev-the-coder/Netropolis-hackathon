import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../API';
import '../css/quest_card.css';

const UserCard = (props) => {
  const navigate = useNavigate();
  const [activeQuest, setActiveQuest] = useState(false);

  const handleAccept = () => {
    // Logic for accepting the user
    setActiveQuest(true);
  };

  const handleReject = () => {
    // Logic for rejecting the user
    setActiveQuest(false);
  };

  return (
    <div className="col-4">
      <div className="card my-10" style={{ marginTop: '3rem' }}>
        <Card className="quest-card">
          <Card.Body>
            <Card.Title className="quest-card-title">{props.name}</Card.Title>
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
              {activeQuest ? 'Yes' : 'No'}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted quest-card-subtitle">
              <span>Points: </span>
              {props.points}
            </Card.Subtitle>
            <div className="buttons-container">
              <Button variant="contained" onClick={handleAccept}>
                Accepted
              </Button>
              <Button variant="contained" onClick={handleReject}>
                Rejected
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UserCard;
