import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Navbar from "./navbar";
import "../css/questboard.css";
import QuestCard from "./QuestCard";
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

const Questboard = () => {
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
    }
  ]);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint you want to send the GET request to

        const apiEndpoint = `${ API }/quest/all`;
        // const apiEndpoint ='https://netropolis-backend.vercel.app/quest/all/';

        const response = await axios.get(apiEndpoint);

        // Assuming the response data is an array, update the state with the fetched data
        setData(response.data);
      } catch (error) {
        // If an error occurs, update the state with the error information
        setError(error);
      } finally {
        // Set loading to false once the request is complete, regardless of success or failure
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  const handleChange = (event) => {
    event.preventDefault();
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

  const handleClick = (event) => {
    event.preventDefault();
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

    

    const apiUrl = `${API}/search/deepSearch/`;
    

    axios({
      method: "post",
      url: apiUrl,
      body:{
        phrase:title
      },
    })
      .then((response) => {
        console.log("GET request successful", response.data);
        setArr(response.data.quests);
      })
      .catch((error) => {
        console.error("Error making GET request", error);
      });
  };
  return (
    <>
      <div className="Questboardsearchbox">
        <div className="Questboardsearchbar">
        <h1>Find the job thats fits for your life</h1>
        <h2>We offer thousands of jobs vacancies right now</h2>
          <form>
            <input
              type="text"
              name="title"
              placeholder="search quest"
              value={title}
              onChange={handleChange}
            />
            {/* <input
              type="text"
              name="location"
              placeholder="location"
              onChange={handleChange}
            /> */}
            <Button variant="primary"onClick={handleClick}>
              Search
            </Button>
          </form>
          <p>browse job offers by title</p>
        </div>
      </div>

      <div className="container questboardcontainer">
        <div className="row questboardrow">
          {arr.map((quest) => {
            return (
              <QuestCard
                id={quest.id}
                title={quest.title}
                duration={quest.duration}
                rewards={quest.points}
                points={quest.points}
                location={quest.location}
                description={quest.description}
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
