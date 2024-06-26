import React from "react";
import { useState,useContext } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "../css/userregister.css";
import { API } from "../API";
import AuthContext from "../context/AuthContext";

function Register() {
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    field_of_specialization: "",
    persona: "",
    dob: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // if (type === "select-multiple") {
    //   const selectedOptions = Array.from(
    //     e.target.selectedOptions,
    //     (option) => option.value
    //   );
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [name]: selectedOptions,
    //   }));
    // } else if (type === "radio") {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    // } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `${API}/users/register`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        localStorage.setItem("netropolis_token", response.data.token);
        setFormData({
          name: "",
          location: "",
          field_of_specialization: "",
          persona: "",
          dob: "",
          email: "",
          password: "",
        });
        getLoggedIn();
        navigate("/");
      })
      .catch((error) => {
        alert(`something went wrong please refill the information ${error}`);
        console.log("Error occured");
      });
  };

  const handleReset = () => {
    setFormData({
      Name: "",
      location: "",
      specialization: "",
      persona: "",
      dob: "",
      email: "",
      password: "",
    });
  };

  return (
    <section className="h-100 bg-dark">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
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
                  <div className="card-body p-md-5 text-black userregister">
                    <h3 className="mb-5 text-uppercase">
                      User registration form
                    </h3>
                    <p style={{ color: "red" }}>* marks mandatory fields</p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              placeholder="XYZ"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1m"
                            >
                              Name*
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* ... (rest of your form fields) */}
                      <div class="form-outline mb-4">
                        <input
                          class="form-control form-control-lg"
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          placeholder="vil:XYZ dist:XYZ state:XYZ pincode:888888"
                        />
                        <label class="form-label" for="form3Example8">
                          location*
                        </label>
                      </div>

                      {/* <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <h6 className="mb-0 me-4">Gender*: </h6>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleInputChange}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="femaleGender"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleInputChange}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="other"
                            checked={formData.gender === "other"}
                            onChange={handleInputChange}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="otherGender"
                          >
                            Other
                          </label>
                        </div>
                      </div> */}

                      {/* <div class="row">
                        <div class="col-md-6 mb-4">
                          <select
                            name="specialization"
                            className="select"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            multiple // Allow multiple selections
                          >
                            <option value="1">field of Specialization</option>
                            <option value="2">Option 1</option>
                            <option value="3">Option 2</option>
                            <option value="4">Option 3</option>
                          </select>
                        </div>
                      </div> */}
                      <div class="form-outline mb-4">
                        <input
                          type="string"
                          name="field_of_specialization"
                          value={formData.field_of_specialization}
                          onChange={handleInputChange}
                          required
                          class="form-control form-control-lg"
                          placeholder="write your specialization with comma  ',' separated"
                        />
                        <label class="form-label" for="form3Example9">
                          Specialization*
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          required
                          class="form-control form-control-lg"
                          placeholder="mm/dd/yyyy"
                        />
                        <label class="form-label" for="form3Example9">
                          DOB*
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="string"
                          name="persona"
                          value={formData.persona}
                          onChange={handleInputChange}
                          required
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Example9">
                          persona*
                        </label>
                      </div>

                      {/* <div class="form-outline mb-4">
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                        <label class="form-label" for="form3Example90">
                          Pincode*
                        </label>
                      </div> */}

                      <div class="form-outline mb-4">
                        <input
                          className="form-control form-control-lg"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="123@gmail.com"
                        />
                        <label class="form-label" for="form3Example97">
                          Email ID*
                        </label>
                      </div>
                      <div class="form-outline mb-4">
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          placeholder="use a strong password"
                        />
                        <label class="form-label" for="form3Example97">
                          password*
                        </label>
                      </div>

                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          className="btn btn-light btn-lg"
                          onClick={handleReset}
                        >
                          Reset all
                        </button>
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg ms-2"
                        >
                          Submit form
                        </button>
                      </div>
                    </form>
                    <ul>
                      <li>
                        <NavLink to="/login">
                          Already registered? user login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/cmlogin">
                          Already registered? Community_manager login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/cmregister">
                          Register as a community manager
                        </NavLink>
                      </li>
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

export default Register;
