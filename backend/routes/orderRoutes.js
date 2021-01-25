const Order  = require('./../models/orderModel');
const express = require('express');
const router = express.Router();
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


// Get order by Id

router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if(order){
      res.json(order);
    } else {
      throw new Error();
    }
  } catch(error){
    console.log(error);
    res.status(404).json({ message: 'Order not found' });
  }
})

module.exports = router;