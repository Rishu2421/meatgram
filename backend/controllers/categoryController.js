const Category = require('../models/category');
const Item = require('../models/Item')
// GET /api/categories
module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

module.exports.getCategoryProducts = async (req, res) => {
  const { categoryname } = req.params;
  try {
    // Find all items that match the specified category name
    const products = await Item.find({ category: categoryname });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
  
};

module.exports.deleteCategory= async (req, res) => {
  const { categoryId } = req.params;
  try {
    await Category.findByIdAndDelete(categoryId);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'An error occurred while deleting the category' });
  }
}

