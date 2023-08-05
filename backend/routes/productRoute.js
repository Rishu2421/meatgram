const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products
router.get("", productController.getProductsByIds);

// GET /api/products/category/:category

router.get('/topselling', productController.getTopSellingProducts);
router.get('/boneless', productController.getBonelessItems);
router.get('/itemsName', productController.getItemsName);
router.get('/allproducts', productController.getProducts);
router.get('/category/:category', productController.getProductsByCategory);

module.exports = router;