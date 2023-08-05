const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const path = require('path');
const crypto = require('crypto');
const Order = require('../models/orders');
dotenv.config({ path: path.join(__dirname, '..', 'config', 'config.env') });
const { User } = require('../models/userModel');
const Item = require('../models/Item');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });


module.exports.checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    // console.log(order);
    const key = process.env.RAZORPAY_API_KEY;
    
    res.status(200).json({
      success: true,
      order,
      key,
    });
  } catch (error) {
    console.error("An error occurred during checkout:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred during checkout",
    });
  }
};



module.exports.paymentVerification = async (req, res) => {
  try {
    console.log("I am here at payment verifiation 41")
    console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // eslint-disable-next-line no-unused-vars
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {

        console.log("payment is verified")

        const isCashOnDelivery = req.body.paymentMethod === "CashOnDelivery";

      if (!isCashOnDelivery) {

        return res.status(200).json({
          success: true,
          paymentMethod:"Razorpay",
          isCashOnDelivery: false
        });
      
      } else {
        return res.status(200).json({
          success: true,
          paymentMethod: "CashOnDelivery",
          isCashOnDelivery: true,
        });
      }
      
    } else {
      console.log("Payment verification failed");
      // Handle payment verification failure
      res.status(400).json({
        success: false,
        error: "You give the invalid payment details",
      });
    }
   
  
  } catch (error) {
    console.error("An error occurred during payment verification:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred during payment verification",
    });
  }
};


module.exports.savePaymentDetails=async (req,res)=> {
  try {
    // Save the payment details in the database
    const isCashOnDelivery = req.body.paymentMethod === "CashOnDelivery";
    if(!isCashOnDelivery){
      const {
        name,
        mobileNumber,
        address,
        userId,
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature, 
      } = req.body;
      const user = await User.findById(userId).populate('cartItems.item');
      const cartItems= user.cartItems;
 
  
      
      const items = await Promise.all(
        cartItems.map(async (cartItem) => {
          const item = await Item.findById(cartItem.item);
          return {
            item,
            quantity: cartItem.quantity,
          };
        })
      );
  
      console.log(items);
      
    
  
    const order = await Order.create({
      name,
      mobileNumber,
      address,
      userId,
      amount,
      items,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature, 

    });
        // Remove purchased items from the user's cart
        user.cartItems = [];
        await user.save();

        // Add the order to the user's orders field
        user.orders.push(order);
        await user.save();

        const token = user.generateJWT();
        if (order) {
         
          return res.status(200).json({
            success: true,
            token,
            userId
          });
        } else {
          console.log("error");
          throw new Error('Failed to save payment details');
        }
    } else {
      return res.status(500).json({
        success: false,
        message:"Wrong Payment Method",
        paymentMethod: "CashOnDelivery",
        isCashOnDelivery: true,
      });
    }
    
  } catch (error) {
    console.error("An error occurred while saving payment details:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while saving payment details",
    });
  }
}


// controllers/paymentController.js
// ...Existing code...

module.exports.cashOnDelivery = async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      address,
      userId,
      amount,

    } = req.body;

    // ... Handle Cash On Delivery logic ...
    // Create the order in the database without Razorpay details
    
    const user = await User.findById(userId).populate('cartItems.item');
    const cartItems= user.cartItems;
  

    
    const items = await Promise.all(
      cartItems.map(async (cartItem) => {
        const item = await Item.findById(cartItem.item);
        return {
          item,
          quantity: cartItem.quantity,
        };
      })
    );

    console.log(items);
    
    const order = await Order.create({
      name,
      mobileNumber,
      address,
      userId,
      amount,
      isCashOnDelivery: true,
      items,
    });

    // Remove purchased items from the user's cart
    user.cartItems = [];
        await user.save();

        // Add the order to the user's orders field
        user.orders.push(order);
        await user.save();

   
    res.status(200).json({
      success: true,
      paymentMethod:"CashOnDelivery",
      isCashOnDelivery: true,
    });
  } catch (error) {
    console.error("An error occurred during Cash On Delivery:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred during Cash On Delivery",
    });
  }
};

