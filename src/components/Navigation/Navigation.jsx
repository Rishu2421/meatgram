import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import LoginModal from "./LoginModal";

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
 
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

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsAuthenticated(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
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
      
      <LoginModal
        showLoginModal={showLoginModal}
        handleLoginModalClose={handleLoginModalClose}
        handleLoginSuccess={handleLoginSuccess}
      />
      
    </div>
    
  );
}

export default Navigation;
