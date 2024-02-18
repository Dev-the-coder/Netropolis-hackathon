import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/questpage.css";
import Navbar from "./navbar";
import Footer from "./Footer";
import { Col } from "react-bootstrap";
import Applications from "./Applicatons";

const Questpage = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data here, e.g., send it to a server
    console.log(formData);
  };

  var CM = false;
  var questId;
  var alreadyapplied = true;
  return (
    <>
      <Navbar />
      <div className="quest-page">
        <div className="quest-details">
          <h1>Quest Title</h1>
          <h3>
            Duration :<span>duration</span>
          </h3>
          <h3>
            Stipend :<span>Stipend</span>
          </h3>
          <h3>
            Points :<span>Points</span>
          </h3>
          <h3>
            Location :<span>location</span>
          </h3>
          <h2>
            Extra Activity :<span>None</span>
          </h2>

          <h4>
            About :
            <span>
              loremepnfnakfifrnierif jclj xkl aklc kj kj kj kj j j j j j ja sj
              jfbuhriufnirquinfiunreiunfiuenwirnfwinfrniwenlinfinwlinin
            </span>
          </h4>
        </div>
        {!CM ? (
          !alreadyapplied ? (
            <div className="quest-form-container">
              <h2>Application form</h2>
              <form onSubmit={handleSubmit} className="quest-form">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <br />

                <label>
                  Date of Birth:
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </label>
                <br />

                <label>
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <br />

                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <br />

                <label>
                  Contact:
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </label>
                <br />

                <button class="btn btn-primary" type="submit">
                  Apply
                </button>
              </form>
            </div>
          ) : (
            <div id="already-applied">
              <h1 >
                You have already applied for this job
              </h1>
              <a href="#">see status &#8594;</a>
            </div>
          )
        ) : (
          <Applications questId={questId} />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Questpage;

{
  /* <div className="quest-form-container">
            <h2>Application form</h2>
            <form onSubmit={handleSubmit} className="quest-form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <br />

              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </label>
              <br />

              <label>
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <br />

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <br />

              <label>
                Contact:
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </label>
              <br />

              <button class="btn btn-primary" type="submit">
                Apply
              </button>
            </form>
          </div>  */
}
