const express = require('express');
const cartController = require('../controllers/cartController');
const userAuthMiddleware = require('../middleware/userAuthMidlleware')
const router = express.Router();


router.get('/', userAuthMiddleware, cartController.getCartItems);
router.post('/addItem', userAuthMiddleware, cartController.addItemToCart);
router.delete('/:itemId', cartController.removeItemFromCart);

module.exports = router;
