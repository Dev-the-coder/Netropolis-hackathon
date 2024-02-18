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
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setdescription] = useState("");
  const [points, setPoints] = useState();
  const [fee, setFee] = useState();
  const [allowance, setAllowance] = useState([]);
  const [show, setShow] = useState(true);
  const [loading, setloading] = useState(false);

  const handleInputChange = (e) => {
    const input = e.target.value;
    // Split the input by commas and trim each number
    const numbersArray = input.split(',').map(number => number.trim());
    setAllowance(numbersArray);
  };

  const handleSubmit = () => {
    setloading(true);

    if (title) {
    //   const user = localStorage.getItem('lfsuserid');
      const newPayload = {
        title:title,
        duration:duration,
        location:location,
        description:description,
        points:points,
        fee:fee,
        allowance:allowance
      }
      console.log(newPayload);

    //   axios({
    //     url: "http://localhost:5000/postitem",
    //     method: "POST",
    //     data: newPayload,
    //   })
    //     .then((response) => {
    //       // console.log(response);
    //       toast("Wohoo 🤩! Item listed successfully.", {
    //         position: toast.POSITION.TOP_RIGHT,
    //         autoClose: 3000, // Close after 3 seconds
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //       });
    //       setitemname("");
    //       setdescription("");
    //       settype("");
    //       setitemquestion("");
    //       setitemimage([]);
    //       // fileInputRef.current.value = '';
    //       // console.log("Executed");
    //       Navigate('/feed');
    //       setloading(false);
    //       setShow(false);
    //     })
    //     .catch((err) => {
    //       setloading(false);
    //       console.log(err);
    //       toast("Oops 😞! Check internet connection or try again later.", {
    //         position: toast.POSITION.TOP_RIGHT,
    //         autoClose: 3000, // Close after 3 seconds
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //       });
    //     });
    // } else {
    //   // console.log("required field missed");
    //   toast("you missed some required fields", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 3000, // Close after 3 seconds
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
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
