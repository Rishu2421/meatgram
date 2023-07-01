import React from "react";
import NavBar from "./NavBar";
import { BrowserRouter, } from "react-router-dom";
function Header(){
    return(
        <div>
          <BrowserRouter>
    <NavBar />
    </BrowserRouter>
        </div>
    );}

export default Header;