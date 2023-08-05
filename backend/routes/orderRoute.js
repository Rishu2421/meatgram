// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const { getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

// User routes
router.get('/user/:userId', getUserOrders);

// Admin routes
router.get('/admin', getAllOrders);
router.put('/admin/:orderId', updateOrderStatus);

module.exports = router;
