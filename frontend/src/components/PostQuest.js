import React, { useState, useRef } from "react";
import axios from "axios";
// import { useToasts } from "react-toast-notifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, Spinner, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

function PostQuest() {
  const Navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [providedBy, setProvidedby] = useState("");
  const [datetime, setDatetime] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setdescription] = useState("");
  const [points, setPoints] = useState("");
  const [fee, setFee] = useState("");
  const [allowance, setAllowance] = useState([]);
  const [tags, setTags] = useState("");
  const [show, setShow] = useState(true);
  const [loading, setloading] = useState(false);

  const handleInputChange = (e) => {
    const input = e.target.value;
    // Split the input by commas and trim each number
    const numbersArray = input.split(",").map((number) => number.trim());
    setAllowance(numbersArray);
  };

  const handleSubmit = () => {
    if (
      points === "" ||
      fee === "" ||
      tags === "" ||
      title === "" ||
      providedBy === "" ||
      datetime === "" ||
      duration === "" ||
      location === "" ||
      description === ""
    ) {
      // toast("you missed some required fields", {
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 3000, // Close after 3 seconds
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // })
      alert("please fill all the mandatory fields");
    } else {
      setloading(true);
      const accessToken = "YOUR_ACCESS_TOKEN";

      const newPayload = {
        title: title,
        providedBy: providedBy,
        datetime: datetime,
        duration: duration,
        location: location,
        description: description,
        points: points,
        fee: fee,
        allowance: allowance,
        tags: tags,
      };
      console.log(newPayload);

      axios({
        url: "api/quest/create/",
        method: "POST",
        data: newPayload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the token in the 'Authorization' header
        },
      })
        .then((response) => {
          // console.log(response);
          // toast("Wohoo 🤩! Item listed successfully.", {
          //   position: toast.POSITION.TOP_RIGHT,
          //   autoClose: 3000, // Close after 3 seconds
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          // });
          // setitemname("");
          // setdescription("");
          // settype("");
          // setitemquestion("");
          // setitemimage([]);
          // // fileInputRef.current.value = '';
          // // console.log("Executed");
          // Navigate("/feed");
          // setloading(false);
          // setShow(false);

          Navigate('/cm')
        })
        .catch((err) => {
          setloading(false);
          // console.log(err);
          alert('something bad happen');
          // toast("Oops 😞! Check internet connection or try again later.", {
          //   position: toast.POSITION.TOP_RIGHT,
          //   autoClose: 3000, // Close after 3 seconds
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          // });
        });
    }
  };

  return (
    <div>
      {/* <img src={src}/> */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <h1>Post item</h1>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                <h3>
                  Title<span style={{ color: "red" }}>*</span>
                </h3>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <h3>
                  Provided By<span style={{ color: "red" }}>*</span>
                </h3>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="provider name"
                value={providedBy}
                onChange={(e) => setProvidedby(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <h3>
                  datetime<span style={{ color: "red" }}>*</span>
                </h3>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="dd/mm/yyyy::hh/mm"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <h3>
                  Duration<span style={{ color: "red" }}>*</span>
                </h3>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="5(days)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <h3>
                  Location<span style={{ color: "red" }}>*</span>
                </h3>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <h3>
                  Description<span style={{ color: "red" }}>*</span>
                </h3>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <h3>
                  Points<span style={{ color: "red" }}>*</span>
                </h3>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="250"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <h3>
                  fee<span style={{ color: "red" }}>*</span>
                </h3>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="2500"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formMobileNumbers">
              <Form.Label>
                <h3>Enter extra activities (comma-separated)</h3>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Forest Bathing Tour1, Two dinner events"
                value={allowance.join(", ")}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <h3>
                  Tags<span style={{ color: "red" }}>*</span>
                </h3>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tags with comma separeted"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              <>Submit</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default PostQuest;
