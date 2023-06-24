const Item = require('../models/Item');

exports.getProducts = async (req, res) => {
  try {
    const products = await Item.find();
    console.log(products);
    return res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
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
