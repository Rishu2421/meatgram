const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRouter');
// const productRoutes = require('./routes/productRoutes');
const adminRoute = require('./routes/adminRouter');
const productsRoute = require('./routes/product');
const categoryRoute = require('./routes/categoriesRoutes')
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001.com'];

app.use(cors({
  origin: allowedOrigins,
}));



app.use('/api/user',userRouter);
// app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoute);
app.use('/api/categories',categoryRoute)
app.use('/api/products', productsRoute);


module.exports = app

