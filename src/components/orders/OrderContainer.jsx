import React, { useState } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';

const OrderContainer = ({ orders, isAdmin }) => {
  const [isLoading, setLoading] = useState(false);

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    try {

      
      const response = await axios.put(`/api/orders/admin/${orderId}`, { status });
      console.log(response.data); // Log the updated order details
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update status');
    }
    setLoading(false);
  };

  return (
    <div className="card mt-4" style={{ width: "90rem" }}>
      <div className="card-body">
        {orders.map((order, index) => (
          <div key={index}>
            <OrderItem
              key={order._id}
              orderDate={order.createdAt}
              orderNumber={order._id}
              totalAmount={order.amount}
              address={order.address}
              products={order.items.map((item) => ({
                imageUrl: `http://localhost:3000/${item.item.image}`,
                productName: item.item.name,
                price: `$${item.item.price}`,
                status: order.status,
              }))}
            />
            {isAdmin && (
              <div>
                <p>Status: {order.status}</p>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  disabled={isLoading}
                >
                  <option value="Not processed">Not processed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {isLoading && <span>Changing status...</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderContainer;
