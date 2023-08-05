const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

// GET /api/categories
router.get('/', categoryController.getCategories);
router.get('/:categoryname', categoryController.getCategoryProducts);
router.delete('/:categoryId', adminAuthMiddleware, categoryController.deleteCategory);

module.exports = router;
