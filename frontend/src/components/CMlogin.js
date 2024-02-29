import React, { useState } from "react";
import "../css/register.css"; // Assuming you have a CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { API } from "../API";
import "../css/userlogin.css"; 
import "../context/AuthContext"

function CMLogin() {
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    axios({
      url: `${API}/commanager/login/`,
      method: "POST",
      data: formData,
    })
      .then((response) => {
        // console.log("Response is :", response.data._id);
        // const lfsuser = response.data._id;

        localStorage.setItem("netropolis_token",response.data.token);
        setFormData({
          email: "",
          password: "",
        });
        getLoggedIn();
        navigate('/cm');

      })
      .catch(() => {
        alert("something went wrong please refill the information")
        console.log("Error occured");
      });
  };

  return (
    <section className="h-100 bg-dark">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-login my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo"
                    className="img-fluid"
                    style={{
                      borderTopLeftRadius: ".25rem",
                      borderBottomLeftRadius: ".25rem",
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black userlogin">
                    <h3 className="mb-5 text-uppercase">Community_manager Login form</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          className="form-control form-control-lg"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="form-label" htmlFor="formLoginEmail">
                          Email*
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="form-label" htmlFor="formLoginPassword">
                          Password*
                        </label>
                      </div>

                      <div className="d-flex justify-content-end pt-3" id="user">
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg ms-2"
                          
                        >
                          community manager Login
                        </button>
                      </div>
                      
                    </form>
                    <ul>
                      <li><NavLink to="/login">login as a user</NavLink></li>
                      <li><NavLink to="/register">new user please register first</NavLink></li>
                      <li><NavLink to="/cmregister">new community manager please register first</NavLink></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CMLogin;
