const { User } = require('../models/userModel');
// const { Item } = require('../models/Item')
const cartController = {

  addItemToCart: async (req, res) => {
    const { userId, itemId, quantity } = req.body;

    // console.log(req.body);
    try {
      // Find the user by their ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // console.log(itemId)
      // Add the item to the user's cart
      user.cartItems.push({ item: itemId, quantity });
      await user.save();

      return res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
getCartItems: async (req, res) => {
  try {
    // console.log(req.user)
    const userId = req.user._id; // Assuming user ID is obtained from authentication middleware
   
    // Retrieve the user with cart items populated
    const user = await User.findById(userId).populate('cartItems.item');

    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   return res.status(200).json({ cartItems: user.cartItems });
  } catch (error) {
    console.log('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},

removeItemFromCart: async (req, res) => {
  const itemId = req.params.itemId;
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the item from the user's cartItems array
    const updatedCartItems = user.cartItems.filter(item => item.item.toString() !== itemId);
    user.cartItems = updatedCartItems;
    await user.save();

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.log('Error removing item from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
};

module.exports = cartController;
