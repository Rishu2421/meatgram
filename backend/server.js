const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = require('./app');


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



app.use(express.static(path.join(__dirname, '../build')));
app.use('/public/uploads', express.static(__dirname+'/public/uploads/'));
// Your other routes and middleware go here

// Serve the index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


// Handle CORS

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  


// Serve the static files from the React app


// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.port}`);
});
