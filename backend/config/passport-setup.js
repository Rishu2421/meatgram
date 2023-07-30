const passport = require('passport');
const { User } = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/user/auth/google/meatgram",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);

      try {
        // Check if the user with the Google ID already exists in the database
        const existingUserByGoogleId = await User.findOne({ googleId: profile.id });

        // Check if the user with the email already exists in the database
        const existingUserByEmail = await User.findOne({ email: profile.emails[0].value });

        if (existingUserByGoogleId) {
          // User with the same Google ID already exists, log in the user
          return cb(null, existingUserByGoogleId);
        } else if (existingUserByEmail) {
          // User with the same email already exists, log in the user
          return cb(null, existingUserByEmail);
        } else {
          // User does not exist, create a new user
          const newUser = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilePicture: profile.picture,
          });

          // New user created, log in the user
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);


module.exports = passport; // Add this line to export the configured passport object


// // config/passport.js

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const {User} = require('../models/userModel');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// passport.use(
//   new GoogleStrategy(
//     {

//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:3001/api/user/auth/google/meatgram",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console.log(profile);

//       User.findOrCreate(
//         {
//           googleId: profile.id,
//           username: profile.displayName,
//           email: profile.emails[0].value,
//           profilePicture: profile.picture,
//         },
//         function (err, user) {
//           // profilePic = profile.photos[0].value;
//           // userName = profile.name.givenName;
//           // // console.log(user);
//           // userId = user._id;
//           // console.log(userId);
//           return cb(err, user);
//         }
//       );
//     }
//   )
// );
// module.exports = passport; // Add this line to export the configured passport object


// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const User = require('../models/userModel'); // Replace with your User model file path
// const session = require('express-session');


// // const MongoStore = require('connect-mongo')(session);

// passport.use(new LocalStrategy(User.authenticate()));

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
// passport.use(
//   new LocalStrategy(
//     { usernameField: 'email' },
//     (email, password, done) => {
//       // Match user
//       User.findOne({ email: email })
//         .then((user) => {
//           if (!user) {
//             return done(null, false, { message: 'Incorrect email or password' });
//           }

//           // Match password
//           bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) throw err;
//             if (isMatch) {
//               return done(null, user);
//             } else {
//               return done(null, false, { message: 'Incorrect email or password' });
//             }
//           });
//         })
//         .catch((err) => console.log(err));
//     }
//   )
// );


