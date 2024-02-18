import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";
import "../css/myapplication.css";
import ApplicationCard from "./ApplicationCard";

const Myapplication = () => {
  var applicationId = ["10","02","03"];
  return (
    <>
      <Navbar />
      <div className="my-application-container ">
        <div>
          <h1>My application</h1>
        </div>
        <div>
          {applicationId.length > 0 ? (
            <div>
              {applicationId.map((id) => (
                <div key={id}>
                  <ApplicationCard appId={id} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="no-record">No records found</div>
              <div className="no-record">
                <a>search for the job &#8594;</a>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Myapplication;
