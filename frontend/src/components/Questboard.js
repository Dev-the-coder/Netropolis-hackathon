import React from "react";
import { Button } from "react-bootstrap";
import Navbar from "./navbar";
import "../css/questboard.css";
import QuestCard from "./QuestCard";
import Footer from "./Footer";
import { Nav } from "react-bootstrap";

const arr = [
  {
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    points:"points",
    location: "location1",
    noc:5
  },
  {
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  }
];

const Questboard = () => {
  return (
    <>
      <div className="Questboardsearchbox">
        <div className="Questboardsearchbar">
          <form>
            <input type="text" name="title" placeholder="job title" />
            <input type="text" name="location" placeholder="location" />
            <Button variant="contained">Search</Button>
          </form>
          <p>browse job offers by title or location</p>
        </div>
      </div>

      <div className="container questboardcontainer">
        <div className="row questboardrow">
          {arr.map((quest) => {
            return (
              <QuestCard
                title={quest.title}
                duration={quest.duration}
                rewards={quest.rewards}
                points={quest.points}
                location={quest.location}
                noofapplicants={quest.noc}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Questboard;
