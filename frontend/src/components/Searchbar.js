import React from "react";
import "../css/searchbar.css";
import { Button } from "react-bootstrap";

const Searchbar = () => {
  return (
    <>
    <div className="searchbox">
      <div className="searchbar">
        <h1>Find the job thats fits for your life</h1>
        <h2>We offer thousands of jobs vacancies right now</h2>
        <form>
            <input type="text" name="title" placeholder="job title"/>
            <input type="text" name="location" placeholder="location"/>
            <Button variant="contained">Search</Button>
        </form>
        <p>browse job offers by title or location</p>
      </div>
    </div>
    </>
  );
};

export default Searchbar;
