const express = require('express');
const Cart = require('../models/cart');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get cart for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userData.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// Add item to cart
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId, title, price, qty, image } = req.body;
    let cart = await Cart.findOne({ userId: req.userData.userId });

    if (!cart) {
      cart = new Cart({ userId: req.userData.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
    } else {
      cart.items.push({ productId, title, price, qty, image });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
});

// Remove item from cart
router.post('/remove', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.userData.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
});

module.exports = router;