import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "../css/myapplication.css";
import ApplicationCard from "./ApplicationCard";
import axios from "axios";
import { API } from "../API";
const Myapplication = () => {
  const [applied, setApplied] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("netropolis_token");
    const headers = {
      "Authorization": token ,
      "Content-Type": "application/json",
    };
    axios
      .get(`${API}/users/quests`, { headers })
      .then((response) => {
        setApplied(response.data.quests);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="my-application-container ">
        <div>
          <h1>My application</h1>
        </div>
        <div>
          {applied.length > 0 ? (
            <div className="container">
              <div className="row">
                {applied.map((quest) => {
                  return (
                    <ApplicationCard
                      key={quest.id}
                      id={quest.id}
                      duration={quest.duration}
                      rewards={quest.rewards}
                      location={quest.location}
                      status={quest.status}
                      title={quest.title}
                      allowance={quest.allowance}
                      datetime={quest.datetime}
                      description={quest.description}
                      fee={quest.fee}
                      points={quest.points}
                      provided_by={quest.provided_by}
                      tags={quest.tags}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="no-record">No records found</div>
              <div className="no-record">
                <Link to="/">search for the job &#8594;</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Myapplication;
