import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Category from "./Category";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import Product from "./Product";
import Navigation from "./Navigation";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { Modal, Button } from "react-bootstrap";

function NavBar() {
  const isAuthenticated = false; // Set this based on user authentication status
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    setOtpSent(false);
    setVerifyOtp(false);
  };

  const handleSendOtp = () => {
    // Perform OTP sending logic here
    setMobileNumber(mobileNumber); // Set the mobile number from the input field
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Perform OTP verification logic here
    setVerifyOtp(true);
  };

  return (
    <BrowserRouter>
      <div>
        <section className="header">
          <div className="container">
            <div className="header-wrap">
              <div className="left">
                <div className="logo">
                  <a href="/">
                    <img src="images/logo.png" alt="logo" />
                  </a>
                </div>
              </div>
              <div className="right">
                {isAuthenticated ? (
                  <Navigation />
                ) : (
                  <div className="first">
                    <div className="search">
                      <SearchBar />
                    </div>
                    <div className="cart">
                      <button className="btn me-2" onClick={handleLoginClick}>
                        <i className="fa fa-user-plus me-2" aria-hidden="true"></i> SignUp
                      </button>
                      <button className="btn" onClick={handleLoginClick}>
                        <i className="fa fa-sign-in me-2" aria-hidden="true"></i> LogIn
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Modal show={showLoginModal} onHide={handleLoginModalClose} backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton>
          <div className="text-center">
            <Modal.Title className="text-center">{verifyOtp ? "Verify OTP" : "LogIn Now"}</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
  {otpSent && !verifyOtp ? (
    <div>
      <p>Enter the OTP sent to {mobileNumber}</p>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Enter OTP" />
      </div>
      <Button variant="primary" className="btn me-2" onClick={handleVerifyOtp}>
        Verify OTP
      </Button>
    </div>
  ) : (
    <div>
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
      <Button variant="primary" className="btn me-4" onClick={handleSendOtp}>
        Send OTP
      </Button>
    </div>
  )}
</Modal.Body>

        </Modal>

        <Routes>
          <Route exact path="/" element={<Body />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />

          {/* Add your other routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default NavBar;























// import React ,{useState} from "react" ;
// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import Body from "./Body";
// import Category from "./Category";
// import SearchBar from "./SearchBar";
// import Cart from "./Cart";
// import Product from "./Product";
// import Navigation from "./Navigation";
// import SignUp from "./SignUp";
// import LogIn from "./LogIn";

// function NavBar() {
//   const isAuthenticated = false; // Set this based on user authentication status



//   return (
//     <BrowserRouter>
//       <div>
//         <section class="header">
//           <div class="container">
//             <div class="header-wrap">
//               <div class="left">
//                 <div class="logo">
//                   <a href="/">
//                     <img src="images/logo.png" alt="logo" />
//                   </a>
//                 </div>
//               </div>
//               <div class="right">
                
//                 {isAuthenticated ? (
//                   <Navigation />
//                 ) : (
//                   <div className="first">
//                   <div class="search">
//             {/* <form action="/action_page.php">
//                 <input type="text" placeholder="Search.." name="search"></input>
//                 <button type="submit"><i class="fa fa-search"></i></button>
//             </form> */}
//             <SearchBar />
//             </div>
//                     <div class="cart">
//                     <a href="/signup" className="btn me-2">
//   <i className="fa fa-user-plus me-2" aria-hidden="true"></i> SignUp
// </a>
// <a href="/login" className="btn">
//   <i className="fa fa-sign-in me-2" aria-hidden="true"></i> LogIn
// </a>
       
//                     {/* <Link to="/signup">Signup</Link>
//                     <Link to="/login">Login</Link> */}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

        
//       </div>
            

//       <Routes>
//         <Route exact path="/" element={<Body />} />
//         <Route path="/category" element={<Category />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/product" element={<Product />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<LogIn />} />
        
//         {/* Add your other routes here */}
//       </Routes>
                    


//     </BrowserRouter>
//   );
// }

// export default NavBar;
