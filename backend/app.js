//app.js
const dotenv = require('dotenv');
dotenv.config({ path : "./config/config.env"});

const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const adminRoute = require('./routes/adminRouter');
const productsRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoriesRoutes');
const cartRoute = require('./routes/cartRoute');
const paymentRoute = require('./routes/paymentRoutes.js')
const orderRoutes = require('./routes/orderRoute');
const passportConfig = require('./config/passport-setup');
const passport = require('passport');
const session = require('express-session');




app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user',userRouter);
app.use('/api/admin', adminRoute);
app.use('/api/categories',categoryRoute)
app.use('/api/products', productsRoute);
app.use('/api/cart',cartRoute);
app.use('/api/payment',paymentRoute)
app.use('/api/orders', orderRoutes);

app.get("/api/getkey",(req,res)=>{
  res.status(200).json({key:process.env.RAZORPAY_API_KEY})
});

module.exports = app

