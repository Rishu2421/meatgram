// authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const authenticationMiddleware = async (req, res, next) => {
  try {
    console.log(req.headers)
    console.log(req.body.headers)
    const token = req.headers.authorization?.split(' ')[1];
 // Assuming the token is provided in the request headers
    // console.log(req.headers);
    // console.log("rhi sis rokrn "+token)
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed. Token not found.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace 'secretKey' with your actual secret key

    // console.log(decoded)

    const user = await User.findById(decoded._id);


    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authenticationMiddleware;
