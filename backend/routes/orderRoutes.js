const express = require('express');
const Order  = require('./../models/orderModel');
const router = express.Router();
const { getProducts, getProductById } = require('./../controllers/productController');
const { protect } = require('./../middlewares/authMiddleware');


router.post('/', protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if(orderItems && orderItems.length === 0){
      res.status(400).json({ message: 'no order items'});
      return
    } else {
      const order = new Order({
        orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
      })

      const createdOrder = await order.save();
      res.status(201).json(createdOrder)
    }
  } catch(error){
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = router;