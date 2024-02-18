import Card from "react-bootstrap/Card";
import "../css/quest_card.css"
import Button from '@mui/material/Button';

const QuestCard = (props) => {
  var CM = false;
  return (
    <div className="col-4">
      <div class="card my-10" style={{ marginTop: "3rem" }}>
        <Card className="quest-card">
          <Card.Body>
            <Card.Title className="quest-card-title"><a href="#">{props.title}</a></Card.Title>
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
            {!CM?<Button variant="contained" href="#contained-buttons">Apply</Button>:<a href="#" id="applicantsanchor">Applications <span>: {props.noofapplicants}</span></a>}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default QuestCard;
