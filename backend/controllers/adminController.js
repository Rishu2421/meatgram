require('dotenv').config();
const jwt = require('jsonwebtoken');
const Item = require('../models/Item');
// const categoryController = require('../controllers/categoryController');
const Category = require('../models/category');


module.exports.authenticate = async (req, res) => {
    const { username, password } = req.body;

    // Check if the entered credentials match the pre-registered admin's credentials
    if (username === process.env.ADMIN && password === process.env.PASSWORD) {
      // Generate a JWT token with an admin-specific secret key
      const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET_KEY);
  
      // Send the token back in the response
    //   res.json({ token });
     
      return res.status(200).send({
        message:"Admin login successfull",
        token : token
    })

    } else {
      // Invalid credentials
      return res.status(401).json({ error: 'Invalid credentials' });
    }

  };
  const multer = require('multer');
  const path = require('path');

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads'); // Set the upload directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    },
  });
  
  const upload = multer({ storage: storage });
  
  module.exports.addProducts = async (req, res) => {
    upload.single('image')(req, res, function (err) {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Failed to upload file' });
      }
  
      // File upload successful, continue with product creation
      const {
        name,
        price,
        quantity,
        numOfPieces,
        description,
        mrp,
        discount,
        category,
        isTopSelling,
        isBoneless,
      } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : 'notprovided';
  
      // Create a new item object
      const newItem = new Item({
        name,
        price,
        image,
        quantity,
        numOfPieces,
        description,
        mrp,
        discount,
        category,
        isTopSelling,
        isBoneless,
      });
  
      // Save the new item to the database
      newItem
        .save()
        .then((createdItem) => {
          console.log('New item created:', createdItem);
          return res.status(201).json(createdItem);
        })
        .catch((error) => {
          console.error('Error creating item:', error);
          return res.status(500).json({ error: 'Failed to create item' });
        });
    });
  };
  
 
module.exports.addCategory = (req, res) => {
    upload.single('image')(req, res, function (err) {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Failed to upload file' });
      }
  
      // File upload successful, continue with category creation
      const { name } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : 'notprovided';
  
      const category = new Category({
        name,
        imageUrl,
      });
  
      category
        .save()
        .then((createdCategory) => {
          console.log('New category created:', createdCategory);
          return res.status(201).json(createdCategory);
        })
        .catch((error) => {
          console.error('Error creating category:', error);
          return res.status(500).json({ error: 'Failed to create category' });
        });
    });
  };

  
module.exports.deleteItem = async (req, res) => {
    const itemId = req.params.id;
  
    try {
      // Find the item by ID
      const item = await Item.findById(itemId);
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      console.log(item); 
      // Delete the item from the database
      await item.deleteOne();
  
      return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      return res.status(500).json({ error: 'Failed to delete item' });
    }
  };


  
  
// module.exports.addProducts = async (req, res) => {
//     upload.single('image')(req, res, function (err) {
//       if (err) {
//         console.error('Error uploading file:', err);
//         return res.status(500).json({ error: 'Failed to upload file' });
//       }
  
//       // File upload successful, continue with product creation
//       const { name, price, quantity, numOfPieces, description, mrp, discount } = req.body;
//       const image = req.file;
  
//       // Create a new item object
//       const newItem = new Item({
//         name,
//         price,
//         image,
//         quantity,
//         numOfPieces,
//         description,
//         mrp,
//         discount,
//       });
  
//       // Save the new item to the database
//       newItem
//         .save()
//         .then((createdItem) => {
//           console.log('New item created:', createdItem);
//           return res.status(201).json(createdItem);
//         })
//         .catch((error) => {
//           console.error('Error creating item:', error);
//           return res.status(500).json({ error: 'Failed to create item' });
//         });
//     });
//   };
  
 
