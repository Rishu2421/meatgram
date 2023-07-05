// components/MyOrderPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderContainer from './OrderContainer';
const MyOrderPage = ({ isAdmin, userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/${isAdmin ? 'admin' : `user/${userId}`}`);
        setOrders(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [isAdmin, userId]);

  const updateOrderStatus = async (orderId) => {
    try {
      // Implement your logic to update the order status
      console.log(`Updating order status for order ID: ${orderId}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
     
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {/* {orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Amount: {order.amount}</p>
              {isAdmin && (
                <div>
                  <p>Status: {order.status}</p>
                  <button onClick={() => updateOrderStatus(order._id)}>Update Status</button>
                </div>
              )}
            </li>
          ))} */}
          {orders.map((order) => (
            <li key={order._id}>
            <OrderContainer orders={orders} />
              {isAdmin && (
                <div>
                  <p>Status: {order.status}</p>
                  <button onClick={() => updateOrderStatus(order._id)}>Update Status</button>
                </div>
              )}
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default MyOrderPage;
