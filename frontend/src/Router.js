import React, { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Register from "./components/register";
import Home from "./components/Home";
import PostQuest from "./components/PostQuest";
import Applications from "./components/Applicatons";
import CMRegister from "./components/CMregistrationform";
import Login from "./components/Login";
import CMLogin from "./components/CMlogin";
import Myapplication from "./components/Myapplications";
import Questpage from "./components/Questpage";
import CMDashboard from "./components/Community_manager_dashbord";
import AuthContext from "./context/AuthContext";
import Approved_Application from "./components/Approved_Application";
import Pagenotfound from "./components/Pagenotfound";
import UserProfile from "./components/Profile";
import CMProfile from "./components/CMprofile";

function Router() {
  const { loggedIn } = useContext(AuthContext);
  // const loggedIn = true;
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {loggedIn === false ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/cm" element={<CMDashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cmregister" element={<CMRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cmlogin" element={<CMLogin />} />
              <Route path="*" element={<Pagenotfound/>}/>
              {/* <Route path="/footer" element={<Footer />} /> */}
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/cm" element={<CMDashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cmregister" element={<CMRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cmlogin" element={<CMLogin />} />
              <Route path="/postquest" element={<PostQuest />} />
              {/* <Route path='/itempage/:itemId' element={<ItemPage/>}  /> */}
              <Route path="/applications/:questId" element={<Applications />} />
              <Route path="/myapplications" element={<Myapplication />} />
              {/* <Route path="/footer" element={<Footer />} /> */}
              <Route path="/questpage" element={<Questpage />} />
              <Route path="/approvedapplication" element={<Approved_Application />} />
              <Route path="/userprofile" element={<UserProfile/>} />
              <Route path="/cmprofile" element={<CMProfile/>} />

              <Route path="*" element={<Pagenotfound/>}/>

            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
