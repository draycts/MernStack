const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);