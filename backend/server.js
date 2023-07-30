const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = require('./app');


const cors = require('cors');


// const DB =
//   "mongodb+srv://Rishu2421:Rishu2421@cluster0.lm2gsfi.mongodb.net/meatgram?retryWrites=true&w=majority";
// Connect to MongoDB
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log(`connection succesfull `);
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/metagram', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsConnection = mongoose.connection;
itemsConnection.on('connected', () => {
  console.log('Connected to MongoDB Items database');
});

itemsConnection.on('error', (error) => {
  console.error('Error connecting to MongoDB Items database:', error);
});



// const itemsConnection = mongoose.connect('mongodb://localhost:27017', 'metagram', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// itemsConnection.on('connected', () => {
//   console.log('Connected to MongoDB Items database');
// });

// itemsConnection.on('error', (error) => {
//   console.error('Error connecting to MongoDB Items database:', error);
// });

// const userConnection = mongoose.connect('mongodb://localhost:27017', 'metagramUser', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// userConnection.on('connected', () => {
//   console.log('Connected to MongoDB User database');
// });

// userConnection.on('error', (error) => {
//   console.error('Error connecting to MongoDB User database:', error);
// });

  // Set up routes and middleware here

  // Serve the static files from the build directory
app.use(express.static(path.join(__dirname, '../build')));
app.use('/public/uploads', express.static(__dirname+'/public/uploads/'));
// Your other routes and middleware go here

// Serve the index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
  

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());


// // Handle requests for the frontend
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// Express session
// app.use(
//     session({
//       secret: 'your-secret-key',
//       resave: false,
//       saveUninitialized: false,
//     })
//   );
//   app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Handle CORS

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
  // Passport middleware
  // app.use(passport.initialize());
  // app.use(passport.session());
  
  // Routes
  // app.use('/auth', authRoutes);
  // app.use('/api/otp', otpRoutes);



// Serve the static files from the React app


// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.port}`);
});
