import React from "react";
import SearchBar from "./SearchBar";
function Navigation(){
    return (

    <div class="first">
        <div class="search">
            {/* <form action="/action_page.php">
                <input type="text" placeholder="Search.." name="search"></input>
                <button type="submit"><i class="fa fa-search"></i></button>
            </form> */}
            <SearchBar />
        </div>
        <div class="category">
        <a href="/category"><img src="images/immediate.png" alt="immediate"/>Category</a>
        </div>
        <div class="product">
        <a href="/product"><i class="fa fa-product-hunt" aria-hidden="true"></i>Product</a>
        </div>
        <div class="cart">
         <a href="/cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Cart</a>
        </div>
        <div class="cart">
         <a href="/cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Cart</a>
        </div>
        
    </div>
    
)}

export default Navigation;