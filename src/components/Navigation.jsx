import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navigation() {
  const navigate = useNavigate();

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
          <img src="images/immediate.png" alt="immediate" />Category
        </a>
      </div>
      <div className="product">
        <a href="/product">
          <i className="fa fa-product-hunt" aria-hidden="true"></i>Product
        </a>
      </div>
      <div className="cart">
        <a href="/cart">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>Cart
        </a>
      </div>
      <div className="cart">
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
              <button className="dropdown-item text-dark" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
