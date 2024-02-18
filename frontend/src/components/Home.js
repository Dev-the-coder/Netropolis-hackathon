import React from "react";
import NavbarUI from "./navbar";
import Searchbar from "./Searchbar";
import Jobtypes from "./Jobtypes";
import Footer from "./Footer";
import Questboard from "./Questboard";
import Questpage from "./Questpage";
import Register from "./register";
import CMDashboard from "./Community_manager_dashbord";
import Profile from "./Profile";
import Myapplication from "./Myapplications";
import CMRegister from "./CMregistrationform";
import Login from "./Login";
import Applications from "./Applicatons";
function Home(){
    return(<>
        <NavbarUI/>
        <Questboard/>
        <Footer/>
    </>)
}

export default Home;