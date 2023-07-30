const router = require('express').Router();
const userController = require('../controllers/userController')
const passport = require('../config/passport-setup');
router.post('/register', userController.registerUser);

// Route to handle user login
router.post('/login', userController.loginUser);


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful Google login
router.get(
    '/auth/google/meatgram',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Generate the JWT token
      const token = req.user.generateJWT();
        const userId=req.user._id;
      // Get the user data
    //   const userData = {
    //     email: req.user.email,
    //     orders: req.user.orders,
    //     // Add other fields as needed
    //   };
  
      // Redirect to the frontend route with the token and user data as query parameters
      res.redirect(`/?token=${token}&userId=${userId}`);
    }
  );
// router.route('/signup')
//     .post(signUp);
// router.route('/signup/verify')
//     .post(verifyOtp);

module.exports = router
