import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Navbar from "./navbar";
import "../css/questboard.css";
import CMQuestCard from "./CmquestCard";
import Footer from "./Footer";
import axios from "axios";
import { API } from "../API";

const arr = [
  {
    id: 1,
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    points: "points",
    location: "location1",
    noc: 5,
  },
  {
    id: 1,
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    id: 1,
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    id: 1,
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    id: 1,
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    id: 1,
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    id: 1,
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    id: 1,
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    id: 1,
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    id: 2,
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    id: 3,
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    id: 4,
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    id: 5,
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    id: 6,
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    id: 7,
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    id: 8,
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    id: 9,
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    id: 10,
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    id: 11,
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    id: 12,
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
  {
    id: 13,
    title: "title1",
    duration: "duration1",
    rewards: "reward1",
    location: "location1",
  },
  {
    id: 14,
    title: "title2",
    duration: "duration2",
    rewards: "reward2",
    location: "location2",
  },
  {
    id: 15,
    title: "title3",
    duration: "duration3",
    rewards: "reward3",
    location: "location3",
  },
  {
    id: 16,
    title: "title4",
    duration: "duration4",
    rewards: "reward4",
    location: "location4",
  },
];




const CMQuestboard = () => {
  const [arr, setArr] = useState([
    {
      id: 15,
      title: "title3",
      duration: "duration3",
      rewards: "reward3",
      location: "location3",
    },
    {
      id: 11,
      title: "title3",
      duration: "duration3",
      rewards: "reward3",
      location: "location3",
    },
    {
      id: 12,
      title: "title4",
      duration: "duration4",
      rewards: "reward4",
      location: "location4",
    },
    {
      id: 13,
      title: "title1",
      duration: "duration1",
      rewards: "reward1",
      location: "location1",
    },
  ]);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Assuming you have the token stored in localStorage
    const token = localStorage.getItem("netropolis_token");

    axios
      .get(`${API}/commanager/myquests`, {
        headers: {
          Authorization:token,
        },
      })
      .then((response) => {
        // Handle successful response
        setArr(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleChange = (event) => {
    // console.log(event.target);
    if (event.target.name === "title") {
      setTitle(event.target.value);
      // console.log(title);
    }
    if (event.target.name === "location") {
      setLocation(event.target.value);
      // console.log(location);
    }
  };

  const handleClick = () => {
    // console.log(title,location);
    // setArr([
    //   {
    //     id: 16,
    //     title: "title4",
    //     duration: "duration4",
    //     rewards: "reward4",
    //     location: "location4",
    //   },
    // ]);

    const apiUrl = { API } + "/search/deepSearch";
    const phrase = title + " " + location;

    axios({
      method: "get",
      url: apiUrl,
      body: {
        phrase: phrase,
      },
    })
      .then((response) => {
        console.log("GET request successful", response.data);
        setArr(response.data);
      })
      .catch((error) => {
        console.error("Error making GET request", error);
      });
  };
  return (
    <>
      {/* <div className="Questboardsearchbox">
        <div className="Questboardsearchbar">
          <h1>Find the job thats fits for your life</h1>
          <h2>We offer thousands of jobs vacancies right now</h2>
          <form>
            <input
              type="text"
              name="title"
              placeholder="job title"
              value={title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="location"
              onChange={handleChange}
            />
            <Button variant="contained" onClick={handleClick}>
              Search
            </Button>
          </form>
          <p>browse job offers by title or location</p>
        </div>
      </div> */}

      <div className="container questboardcontainer">
        <div className="row questboardrow">
          {arr.map((quest) => {
            return (
              <CMQuestCard
                id={quest.id}
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

export default CMQuestboard;