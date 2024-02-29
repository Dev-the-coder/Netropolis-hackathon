import React from "react";

import Navbar from "./navbar";
import Questboard from "./Questboard";
import UserCard from "./User_Card";


function Home(){
    return(<>
        <Navbar/>
        <Questboard/>
    </>)
}

export default Home;