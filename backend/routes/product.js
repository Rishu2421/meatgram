const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products
router.get('/', productController.getProducts);

// GET /api/products/category/:category

router.get('/category/:category', productController.getProductsByCategory);

module.exports = router;