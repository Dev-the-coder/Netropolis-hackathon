import React from "react";
import "../css/Application.css"

const Applications = (propsId) => {
  var noofapplicants = 3;
  var users = ["Ram", "Rahul", "Devesh"];
  return (
    <>
      {noofapplicants === 0 ? (
        <div className="applications">
        <h1>No any user applied for this quest</h1>
        </div> ) : (
        <div className="applications">
          <h1>User applied for this quest</h1>
          <ul>
            {users.map((user) => (
              <li>{user}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Applications;
