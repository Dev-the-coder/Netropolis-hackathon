import React, { useState } from "react";
import "../css/navbar.css";
import { Button } from "react-bootstrap";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  
  var [loggedIn,setloggedIn] = useState(true);
  var [CM,setCM] = useState(true);
  const signout = () => {
    // constraint.LOGGED_IN = false;
    // setConstraint(false);

    console.log("Signed out !");
    setloggedIn(false);
    setCM(false);
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
              <span>Q</span>uest
              <span>P</span>rovider
            </h2>
          </div>
          <div className={"menu-link"}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/footer">Contacts</NavLink>
              </li>
              <li>
                {loggedIn && CM ? (
                  <NavLink to="/applications">Approved-applications</NavLink>
                ) : loggedIn ? (
                  <NavLink to="/myapplications">My-applications</NavLink>
                ) : (
                  <></>
                )}
              </li>
              <li>
                {loggedIn && CM ? (
                  <NavLink to="/postquest">post quest</NavLink>
                ) : (
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
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
