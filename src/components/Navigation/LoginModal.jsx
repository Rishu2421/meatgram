// LoginModal.js
import React, { useState ,useEffect } from "react";
import { Modal, Button,Alert } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router-dom";
const LoginModal = ({ showLoginModal, handleLoginModalClose, handleLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check if the URL contains query parameters
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const userId = params.get("userId");

      // Save the token and userId to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    }
  }, [location.search]);
 
  const handleLoginWithFacebook = () => {
    // Show alert message for Facebook login (Coming Soon)
    setErrorAlert("Facebook login is coming soon. Please try another way.");
  };

  const handleSignupWithEmail = () => {
    axios
      .post("/api/user/register", { email, password })
      .then((response) => {
        // If the login is successful, you can call handleLoginSuccess() here
        // and close the modal after successful login
        console.log(response.data); // You can do further handling of the response here if needed
        if (response.status === 200) {
            const token = response.data.token; // Extract the JWT token from the response
            const userId = response.data.userId;
  
            localStorage.setItem("token", token); // Store the token in localStorage
            localStorage.setItem("userId", userId);
  
            handleLoginSuccess(); // Call the parent component's function to update authentication status and close the modal
        }
        handleLoginModalClose();
      })
      .catch((error) => {
        // Handle registration error
        setErrorAlert("User already registered. Please log in instead.");
      });
  };

  const handleLoginWithEmail = () => {
    axios
      .post("/api/user/login", { email, password })
      .then((response) => {
        // If the login is successful, you can call handleLoginSuccess() here
        // and close the modal after successful login
        console.log(response.data); // You can do further handling of the response here if needed
        if (response.status === 200) {
            const token = response.data.token; // Extract the JWT token from the response
            const userId = response.data.userId;
  
            localStorage.setItem("token", token); // Store the token in localStorage
            localStorage.setItem("userId", userId);
            console.log(userId)
            handleLoginSuccess(); // Call the parent component's function to update authentication status and close the modal
          }
        handleLoginModalClose();
      })
      .catch((error) => {
        // Handle login error
        setErrorAlert("Invalid credentials. Please try again.");
      });
  };

  const handleLoginWithGoogle = () => {
    // Redirect the user to the Google login route on your backend
    window.location.href = '/api/user/auth/google';

  };
  

  

  return (
    <Modal
      show={showLoginModal}
      onHide={handleLoginModalClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}
        {(
          <div>
            <form>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button variant="warning" className="btn me-4" onClick={handleSignupWithEmail}>
              <i className="fa fa-sign-in me-2" aria-hidden="true"></i>{" "}
                Register
             </Button> 
              <Button variant="primary" className="btn me-4" onClick={handleLoginWithEmail}>
              <i className="fa fa-sign-in me-2" aria-hidden="true"></i>{" "}
                Log In
              </Button>
              <hr />
              
              <Button
                variant="danger"
                className="btn me-4 d-inline align-items-center"
                onClick={handleLoginWithGoogle}
              >
               <FontAwesomeIcon icon={faGoogle} className="me-2" /> Sign In with Google
              </Button>
              
              
              <Button
                variant="primary"
                className="btn d-inline align-items-center"
                onClick={handleLoginWithFacebook}
              >
               <FontAwesomeIcon icon={faFacebook} className="me-2" /> Sign In with Facebook
              </Button>
            </form>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

