const router = require('express').Router();
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const { authenticate, addProducts,deleteItem,addCategory } = require('../controllers/adminController');


router.route('/auth').post(authenticate);

router.route('/addproduct').post(adminAuthMiddleware, addProducts);
router.route('/add-category').post(adminAuthMiddleware, addCategory);

router.delete('/items/:id', deleteItem);

module.exports = router;