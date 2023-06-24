import React from 'react';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from '../AdminControl/AdminDashboard';
import ViewProducts from '../AdminControl/ViewProducts';
import AddProduct from '../AdminControl/AddProduct';
import RemoveProduct from '../AdminControl/RemoveItem';
import AddCategory from '../AdminControl/AddCategory';
import './AdminPanel.css';

const AdminPanel = ({ onLogout }) => {
  const location = useLocation();
  const showAdminPanel = location.pathname === '/admin';

  return (
    <div className="container">
      
        <div>
          {/* Navigation buttons */}
          {showAdminPanel && (
          <div className="admin-buttons">
            <div className="admin-button">
              <Link to="/admin/dashboard" className="nav-link">
                Dashboard
              </Link>
            </div>
            <div className="admin-button">
              <Link to="/admin/view-products" className="nav-link">
                View Products
              </Link>
            </div>
            <div className="admin-button">
              <Link to="/admin/add-product" className="nav-link">
                Add Product
              </Link>
            </div>
            <div className="admin-button">
              <Link to="/admin/add-category" className="nav-link">
                Add Category
              </Link>
            </div>
            <div className="admin-button">
              <button onClick={onLogout} className="nav-link">
                Logout
              </button>
            </div>
          </div>
          )}
          {/* Admin routes */}
          <div className="admin-content">
            <Routes>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/view-products" element={<ViewProducts />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/add-category" element={<AddCategory />} />
            </Routes>
          </div>
        </div>
     
    </div>
  );
};

export default AdminPanel;
