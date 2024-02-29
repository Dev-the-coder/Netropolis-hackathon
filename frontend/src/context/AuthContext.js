import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { API } from "../API";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  function getLoggedIn() {

    const token = localStorage.getItem("netropolis_token");
    if(token){
      setLoggedIn(true);
    }
    
    
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
