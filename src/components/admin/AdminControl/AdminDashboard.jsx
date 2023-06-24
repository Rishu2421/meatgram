import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col">
          <Link to="/admin/view-products" className="btn btn-primary">View Products</Link>
        </div>
        <div className="col">
          <Link to="/admin/add-product" className="btn btn-primary">Add Product</Link>
        </div>
        <div className="col">
          <Link to="/admin/remove-product" className="btn btn-primary">Remove Product</Link>
        </div>
        <div className="col">
          <Link to="/admin/add-top-selling-product" className="btn btn-primary">Add Top Selling Product</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
