const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// Create an instance of Express.js
const app = express();
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const otpRoutes = require('./routes/otpRoutes');

// Connect to MongoDB

const itemsConnection = mongoose.createConnection('mongodb://localhost:27017/metagram', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

itemsConnection.on('connected', () => {
  console.log('Connected to MongoDB Items database');
});

itemsConnection.on('error', (error) => {
  console.error('Error connecting to MongoDB Items database:', error);
});

const userConnection = mongoose.createConnection('mongodb://localhost:27017/metagramUser', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

userConnection.on('connected', () => {
  console.log('Connected to MongoDB User database');
});

userConnection.on('error', (error) => {
  console.error('Error connecting to MongoDB User database:', error);
});

  // Set up routes and middleware here

  
app.use(express.static(path.join(__dirname, 'public')));


// Handle requests for the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Express session
app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Routes
  app.use('/auth', authRoutes);
  app.use('/api/otp', otpRoutes);

// Serve the static files from the React app


// Start the server
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
