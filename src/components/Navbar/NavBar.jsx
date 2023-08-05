import React, { useState,useRef,useContext } from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import './NavBar.css'
import Body from "../Body";
import Category from "../Category";
import Cart from "../Cart";
import Product from "../Product";
import Navigation from "../Navigation/Navigation";

import AdminApp from "../admin/AdminApp/AdminApp";
import Items from '../product/Items'
import PaymentSuccess from '../orders/PaymentSuccess'
import MyOrderPage from "../orders/MyOrderPage";
import OrderStatusUpdate from "../orders/OrderStatusUpdate";
import LoginModal from "../Navigation/LoginModal";
import { AuthContext } from "../contexts/AuthContext";
function NavBar() {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  
  const [selectedCity, setSelectedCity] = useState("Bhopal");
  const handleCategoryChoice = (category) => {
    setCategoryName(category);
    navigate(`/category/${categoryName}`);
  };

  const cities = [
    "Arera Colony",
    "Bairagarh",
    "Berasia Road",
    "Bittan Market",
    "GovindPura",
    "Habibganj",
    "Hamidia Road",
    "Hoshangabad Road",
    "Indrapuri",
    "Jahangirabad",
    "Koh-e-Pizza",
    "Kolar Road",
    "Malviya Nagar",
    "Marvari Road",
    "MP Nagar",
    "Peergate",
    "Raisen Road",
    "Shahpura",
    "Shivaji Nagar",
    "Sultania Road"
  ];

  const selectRef = useRef(null);

  const handleCityClick = () => {
    // Trigger click event on the hidden select element
    selectRef.current.click();
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  


  return (
  
      <div>
        <section className="header">
          <div className="container">
            <div className="header-wrap">
              <div className="left">
                <div className="logo">
                  <a href="/">
                    <img src="/images/logo.png" alt="logo" />
                  </a>
                </div>
                <div className="title d-inline" onClick={handleCityClick}>
               
                <select
                  ref={selectRef}
                  className="hidden-select"
                  onChange={(e) => handleCityChange(e.target.value)}
                  value={selectedCity}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              </div>
              <div className="right">
                  <Navigation />
               </div>
            </div>
          </div>
        </section>

       

        <Routes>
          <Route exact path="/" element={<Body categoryChoice={handleCategoryChoice} />} />
          <Route path="/category" element={<Category categoryChoice={handleCategoryChoice} />} />
          <Route path="/category/:categoryName" element={<Items category={categoryName} showAll={true} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:productType" element={<Items showAll={true} />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/user/myorder" element={<MyOrderPage isAdmin={false} userId={userId} />} />

          <Route path="/order/:orderId" element={<OrderStatusUpdate />}/>
           {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/login" element={<LoginModal />} /> 

          {/* Add your other routes here */}
        </Routes>
      </div>
  );
}

export default NavBar;
