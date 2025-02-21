// filepath: /d:/2089375/GHCP-react-base-app/mern-Ecom-app/backend/routes/cart.js
const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get cart for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId).select('cart');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// Add item to cart
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId, title, price, qty, image } = req.body;
    const user = await User.findById(req.userData.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.cart.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      user.cart[itemIndex].qty += qty;
    } else {
      user.cart.push({ productId, title, price, qty, image });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
});

// Remove item from cart
router.post('/remove', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.userData.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.cart.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      user.cart.splice(itemIndex, 1);
      await user.save();
      res.status(200).json(user.cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
});

// Update cart
router.post('/update', authMiddleware, async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await User.findById(req.userData.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = cart.map(item => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      qty: item.qty,
      image: item.image
    }));

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
});

module.exports = router;