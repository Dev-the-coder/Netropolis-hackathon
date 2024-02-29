import React, { useEffect, useState,useContext } from "react";
import "../css/navbar.css";
import { Button } from "react-bootstrap";

import { NavLink,useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";


const Navbar = () => {
  const Navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  const { loggedIn } = useContext(AuthContext);
  
  // var [loggedIn,setloggedIn] = useState(false);
  // var [CM,setCM] = useState(false);


  useEffect(()=>{
    // const token = localStorage.getItem("netropolis_token");
    // console.log(token)
    // if(token){
    //   setloggedIn(true);
    //   // agar wo cm h to set cm = true as well
    // }
    getLoggedIn();
  },[]);


  const signout = () => {
    // constraint.LOGGED_IN = false;
    // setConstraint(false);

    localStorage.removeItem("netropolis_token")
    getLoggedIn();
    Navigate('/')
    
    // console.log("Signed out !");
    // setloggedIn(false);
    // setCM(false);
    // axios({
    //   url: "http://localhost:5000/signout",
    //   method: "POST",
    //   headers: {
    //     // Authorization: token ? `Bearer ${token}` : "",
    //   },
    // })
    //   .then(localStorage.removeItem("lfsuserid"))
    //   .catch((error) => {
    //     console.log(error);
    //     // console.log("Error occured");
    //   });
  };
  return (
    <>
      <header className="sticky bg-white">
        <nav className="main-nav">
          <div className="logo">
            <h2>
              <span>N</span>etroPolis
              <span>C</span>ommunity
            </h2>
          </div>
          <div className={"menu-link"}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                {loggedIn ? (
                  <NavLink to="/myapplications">My-applications</NavLink>
                ):(
                  <></>
                )}
              </li>
              <li>
                {loggedIn ? (
                  <NavLink onClick={signout} to="/">
                    log out
                  </NavLink>
                ) : (
                  <NavLink to="/register">sign in/register</NavLink>
                )}
              </li>
              <li>
                {loggedIn ? (
                  <NavLink to="/userprofile">
                    your profile
                  </NavLink>
                ) : <></>}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
