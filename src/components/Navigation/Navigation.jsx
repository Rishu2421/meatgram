import React,{useState,useEffect} from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../Search/SearchBar";
import { Modal, Button } from "react-bootstrap";
import Cart from "../Cart";
function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    // Check for authentication token on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    setOtpSent(false);
    setVerifyOtp(false);
  };

  const handleSendOtp = () => {

    const data = {
      mobileNumber: mobileNumber,
    };
    axios.post("/api/user/signup", data).then((response) => {

        setOtpSent(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleVerifyOtp = () => {
    // Perform OTP verification logic here
    const givenOtp = enteredOtp; // Get the entered OTP from the input field
 
    const data = {
      mobileNumber: mobileNumber,
      otp: givenOtp,
    };
  
    axios
      .post("/api/user/signup/verify", data)
      .then((response) => {
        console.log(response.status);
        console.log(response)
        if (response.status === 200) {
          const token = response.data.token; // Extract the JWT token from the response
          const userId = response.data.userId; 
         
          setIsAuthenticated(true);
          localStorage.setItem("token", token); // Store the token in localStorage
          localStorage.setItem("userId", userId);
         
          handleLoginModalClose();
        }
        // Perform necessary actions based on the verification result
        // For example, redirect to a logged-in page or show an error message
      })
      .catch((error) => {
        console.error(error);
      });
    setVerifyOtp(true);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="first">
             
      <div className="search">
        <SearchBar />
      </div>
      <div className="category">
        <a href="/category">
          <img src="/images/immediate.png" alt="immediate" />Category
        </a>
      </div>
      <div className="product">
        <a href="/product/allproducts">
          <i className="fa fa-product-hunt" aria-hidden="true"></i>Product
        </a>
      </div>
      <div className="cart">
        <a href="/cart">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>Cart
        </a>
      </div>
      
      {isAuthenticated?<div className="cart">
        <div className="dropdown">
          <a
            className="btn btn-secondary dropdown-toggle"
            href="/profile"
            role="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-user" aria-hidden="true"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
          <li>
              <a className="dropdown-item text-dark" href="/profile">
                My Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item text-dark" href="/user/myorder">
                My Orders
              </a>
            </li>
            <li>
              <button className="dropdown-item text-dark" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>:
      <div className="cart">
                    <button
                      className="btn btn-light mr-8"
                      onClick={handleLoginClick}
                      style={{ paddingRight: "1rem"}}
                    >
                      <i className="fa fa-sign-in me-2" aria-hidden="true"></i>{" "}
                      LogIn
                    </button>
            </div>
      }
      
      
      <Modal
          show={showLoginModal}
          onHide={handleLoginModalClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              {verifyOtp ? "Verify OTP" : "LogIn Now"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {otpSent && !verifyOtp ? (
              <div>
                <p>Enter the OTP sent to {mobileNumber}</p>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                  />
                </div>
                <Button variant="primary" className="btn me-2" onClick={handleVerifyOtp}>
                  Verify OTP
                </Button>
              </div>
            ) : (
              <div>
                <form>
                  <h5>Enter Mobile Number</h5>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="primary"
                    className="btn me-4"
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </Button>
                </form>
              </div>
            )}
          </Modal.Body>
        </Modal>
    </div>
    
  );
}

export default Navigation;
