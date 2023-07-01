const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const adminRoute = require('./routes/adminRouter');
const productsRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoriesRoutes');
const cartRoute = require('./routes/cartRoute');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001.com'];

app.use(cors({
  origin: allowedOrigins,
}));



app.use('/api/user',userRouter);
app.use('/api/admin', adminRoute);
app.use('/api/categories',categoryRoute)
app.use('/api/products', productsRoute);
app.use('/api/cart',cartRoute)


module.exports = app

