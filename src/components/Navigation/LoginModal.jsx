// LoginModal.js
import React, { useState ,useEffect,useContext } from "react";
import { Modal, Button,Alert } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
const LoginModal = ({ showLoginModal, handleLoginModalClose, handleLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(null);
  const location = useLocation();
  const { setUserId, setToken } = useContext(AuthContext);
  useEffect(() => {
    // Check if the URL contains query parameters
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const userId = params.get("userId");

        localStorage.setItem("token", token); // Store the token in localStorage
        localStorage.setItem("userId", userId);
        setToken(token); // Set the token in the AuthContext
        setUserId(userId); // Set the userId in the AuthContext
    
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
            console.log(response.data)
            setTimeout(function() {
              localStorage.setItem("token", token); // Store the token in localStorage
              localStorage.setItem("userId", userId);
              setToken(token); // Set the token in the AuthContext
              setUserId(userId); // Set the userId in the AuthContext
             
          }, 50);
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
        // You can do further handling of the response here if needed
        if (response.status === 200) {
            const token = response.data.token; // Extract the JWT token from the response
            const userId = response.data.userId;

            setTimeout(function() {
              localStorage.setItem("token", token); // Store the token in localStorage
              localStorage.setItem("userId", userId);
              setToken(token); // Set the token in the AuthContext
              setUserId(userId); // Set the userId in the AuthContext
             
          }, 50);
            
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





// // LoginModal.js
// import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import axios from "axios";

// const LoginModal = ({ showLoginModal, handleLoginModalClose, handleLoginSuccess }) => {
//   const [otpSent, setOtpSent] = useState(false);
//   const [verifyOtp, setVerifyOtp] = useState(false);
//   const [enteredOtp, setEnteredOtp] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");

//   const handleSendOtp = () => {
//     const data = {
//       mobileNumber: mobileNumber,
//     };
//     axios
//       .post("/api/user/signup", data)
//       .then((response) => {
//         setOtpSent(true);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleVerifyOtp = () => {
//     // Perform OTP verification logic here
//     const givenOtp = enteredOtp; // Get the entered OTP from the input field

//     const data = {
//       mobileNumber: mobileNumber,
//       otp: givenOtp,
//     };

//     axios
//       .post("/api/user/signup/verify", data)
//       .then((response) => {
        // if (response.status === 200) {
        //   const token = response.data.token; // Extract the JWT token from the response
        //   const userId = response.data.userId;

        //   localStorage.setItem("token", token); // Store the token in localStorage
        //   localStorage.setItem("userId", userId);

        //   handleLoginSuccess(); // Call the parent component's function to update authentication status and close the modal
        // }
//         // Perform necessary actions based on the verification result
//         // For example, redirect to a logged-in page or show an error message
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     setVerifyOtp(true);
//   };

//   return (




//     <Modal
//       show={showLoginModal}
//       onHide={handleLoginModalClose}
//       backdrop="static"
//       keyboard={false}
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title className="text-center">
//           {verifyOtp ? "Verify OTP" : "LogIn Now"}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {otpSent && !verifyOtp ? (
//           <div>
//             <p>Enter the OTP sent to {mobileNumber}</p>
//             <div className="form-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter OTP"
//                 value={enteredOtp}
//                 onChange={(e) => setEnteredOtp(e.target.value)}
//               />
//             </div>
//             <Button variant="primary" className="btn me-2" onClick={handleVerifyOtp}>
//               Verify OTP
//             </Button>
//           </div>
//         ) : (
//           <div>
//             <form>
//               <h5>Enter Mobile Number</h5>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your mobile number"
//                   value={mobileNumber}
//                   onChange={(e) => setMobileNumber(e.target.value)}
//                 />
//               </div>
//               <Button variant="primary" className="btn me-4" onClick={handleSendOtp}>
//                 Send OTP
//               </Button>
//             </form>
//           </div>
//         )}
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default LoginModal;
