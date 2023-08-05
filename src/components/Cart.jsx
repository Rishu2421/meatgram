import React, { useState, useEffect } from "react";
import CheckoutPage from "./orders/CheckoutPage/CheckoutPage";
function Cart() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    fetchCartItems();
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  };
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch('/api/cart/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
      } else {
        console.log('Failed to fetch cart items');
      }
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      // Remove the item from the cartItems array on the client-side
      const updatedCartItems = cartItems.filter(item => item.item._id !== itemId);
      setCartItems(updatedCartItems);
  
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Add the Content-Type header
        },
        body: JSON.stringify({ userId }), // Send the userId in the request body
      });
  
      if (response.ok) {
        // Item removed successfully, no need to fetch updated cart items
        console.log('Item removed from cart successfully');
      } else {
        // Revert back the cart items if there is an error
        setCartItems(cartItems);
        console.log('Failed to remove item from cart');
      }
    } catch (error) {
      console.log('Error removing item from cart:', error);
    }
  };
  
  
  
  const calculateTotalValue = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const { quantity, item: { price } } = item;
      total += quantity * price;
    });
    return total;
  };

  return (


    <div>
   {!isAuthenticated ? (
        <div className="alert alert-warning">
          Please login to view your cart and do checkout.
        </div>
      ) : (
        <>

    {showCheckout ? (
      <CheckoutPage amount={calculateTotalValue()} products={cartItems}/>
    ) : (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item,index) => (
                <tr key={`${item.item._id}-${index}`}>
                  <td>{item.item.name}</td>
                  <td>{item.item.quantity}</td>
                  <td>{item.item.price}</td>
                  <td>{item.quantity * item.item.price}</td>
                  <td>
                    <button onClick={() => removeItemFromCart(item.item._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total: {calculateTotalValue()}</p>
          <button className="btn btn-primary" onClick={() => setShowCheckout(true)}>
          Buy Now
        </button>
         
        </div>
      )}
    </div> )}
    </>
      )}


  </div>
 
 
 
 );
}

export default Cart;
