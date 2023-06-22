// auth.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel'); // Replace with the path to your User model

// User login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: 'Invalid email or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: 'Login successful' });
    });
  })(req, res, next);
});

// User signup route
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.json({ message: 'Email already exists' });
      }
      const newUser = new User({
        name,
        email,
        password,
      });
      newUser.save()
        .then(() => {
          return res.json({ message: 'Signup successful' });
        })
        .catch((err) => {
          console.error('Error saving user:', err);
          return res.status(500).json({ message: 'Error saving user' });
        });
    })
    .catch((err) => {
      console.error('Error finding user:', err);
      return res.status(500).json({ message: 'Error finding user' });
    });
});

// User logout route
router.get('/logout', (req, res) => {
  req.logout();
  return res.json({ message: 'Logout successful' });
});

module.exports = router;
