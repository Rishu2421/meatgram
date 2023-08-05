import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from '../AdminControl/AdminDashboard';
import ViewProducts from '../AdminControl/ViewProducts';
import AddProduct from '../AdminControl/AddProduct';
import AddCategory from '../AdminControl/AddCategory';
import CategoryView from '../AdminControl/CategoryView';
import './AdminPanel.css';
import MyOrderPage from '../../orders/MyOrderPage';
import BannerComponent from '../AdminControl/Banner/BannerComponent';

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
              <Link to="/admin/view-category" className="nav-link">
                View Category
              </Link>
            </div>
            <div className="admin-button">
              <Link to="/admin/banner" className="nav-link">
                Banner
              </Link>
            </div>
            {/* <div className="admin-button">
              <Link to="/admin/removebanner" className="nav-link">
                  Remove Banner
              </Link>
            </div> */}
            
            <div className="admin-button">
              <Link to="/admin/order" className="nav-link">
                View Orders
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
              <Route path="/view-category" element={<CategoryView />} />
              <Route path="/banner" element={<BannerComponent />} />
              <Route path="/order" element={<MyOrderPage isAdmin={true} />} />
            </Routes>
          </div>
        </div>
     
    </div>
  );
};

export default AdminPanel;
