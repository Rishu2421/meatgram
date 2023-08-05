const router = require('express').Router();
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const { authenticate, addProducts,deleteItem,getBanners,addCategory,addBanner,removeBanner } = require('../controllers/adminController');


router.get('/getbanner', getBanners);

router.route('/auth').post(authenticate);
router.route('/addproduct').post(adminAuthMiddleware, addProducts);
router.route('/add-category').post(adminAuthMiddleware, addCategory);
router.route('/addbanner').post(adminAuthMiddleware, addBanner);
router.route('/removebanner/:bannerId').delete(adminAuthMiddleware, removeBanner);
router.delete('/items/:id', deleteItem);

module.exports = router;