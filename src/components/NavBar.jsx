import React, { useState } from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import Body from "./Body";
import Category from "./Category";
import Cart from "./Cart";
import Product from "./Product";
import Navigation from "./Navigation/Navigation";

import AdminApp from "./admin/AdminApp/AdminApp";
import Items from './product/Items'
import PaymentSuccess from './orders/PaymentSuccess'
import MyOrderPage from "./orders/MyOrderPage";
import OrderStatusUpdate from "./orders/OrderStatusUpdate";
// const jwt= require('jsonwebtoken')f
// require('dotenv').config();

function NavBar() {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const handleCategoryChoice = (category) => {
    setCategoryName(category);
    console.log("I am here in navbar.jsx")
    navigate(`/category/${categoryName}`);
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
          {/* <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} /> */}

          {/* Add your other routes here */}
        </Routes>
      </div>
  );
}

export default NavBar;
