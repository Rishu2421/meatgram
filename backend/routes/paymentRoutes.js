const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

// router.route('/checkout')
//     .post(paymentController.checkout);
router.post("/checkout",paymentController.checkout);
router.post("/paymentverification", paymentController.paymentVerification);
router.post("/savepayment",paymentController.savePaymentDetails)
module.exports = router;