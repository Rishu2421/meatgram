import React from 'react';
import OrderItem from './OrderItem';

const OrderContainer = ({orders}) => {
  return (
    <div className="card mt-4" style={{width:"90rem"}}>
      <div className="card-body ">
      <h1 className="mt-4">Order History</h1>
     <p className="text-muted">Check the status of recent orders, manage returns, and download invoices.</p>
    
     {orders.map((order) => (
  <OrderItem
    key={order._id}
    orderDate="January 22, 2021"
    orderNumber={order._id}
    totalAmount={order.amount}
    products={[
      {
        imageUrl: 'https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg',
        productName: 'Machined Pen and Pencil Set',
        price: '$70.00',
        status: 'Delivered Jan 25, 2021'
      },
      // Add more products here
    ]}
  />
))}


        {/* Add more OrderItem components for each order */}
      </div>
    </div>
  );
};

export default OrderContainer;
