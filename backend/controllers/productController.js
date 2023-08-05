const Item = require('../models/Item');

exports.getProducts = async (req, res) => {
  try {
    const products = await Item.find();
    return res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getTopSellingProducts = (req, res) => {
  // Query the database for top-selling products
  Item.find({ isTopSelling: true })
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error('Error fetching top-selling products:', error);
      res.status(500).json({ error: 'An error occurred while fetching top-selling products.' });
    });
};
exports.getItemsName = (req, res) => {
  // Query the database for top-selling products and select only the 'name' field
  Item.find({}, 'name')
    .then((products) => {
     
      // Extract the names from the query result and create an array of names
     
      return res.json(products); // Send only the array of names in the response
    })
    .catch((error) => {
      console.error('Error fetching top-selling products:', error);
      return res.status(500).json({ error: 'An error occurred while fetching top-selling products.' });
    });
};

  exports.getBonelessItems = async (req, res) => {
    Item.find({ isBoneless: true })
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error('Error fetching Boneless products:', error);
      res.status(500).json({ error: 'An error occurred while fetching Boneless products.' });
    });
  };

  exports.getProductsByIds = async (req, res) => {
    try {
      const itemIds = req.query.ids.split(',');
    
  
      // Fetch the products from the database using the item IDs
      const products = await Item.find({ _id: { $in: itemIds } });
  
      if (products.length !== itemIds.length) {
        return res.status(404).json({ message: 'One or more products not found' });
      }
  
      // Return the products as a JSON response
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Item.find({ category });
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return res.status(500).json({ error: 'Failed to fetch products by category' });
  }
};
