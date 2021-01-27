const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();
const { protect, admin } = require('./../middlewares/authMiddleware');
const { getProducts, getProductById } = require('./../controllers/productController');

router.get('/', async (req, res) => {
  try {
    const products = await getProducts()
    res.json(products);
  } catch(error){
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.get('/:id', async (req, res) => {
  // const product = products.find(p => p._id === req.params.id)
  try {
    const { params } = req;
    const product = await getProductById(params.id);
    res.json(product);
  } catch(error){
    console.log(error);
    res.status(404).json({ message: 'Product not found' });
  }
})

// Delete a product
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const { params } = req;
    const product = await Product.findById(params.id);
    if(product){
      await product.remove();
      res.json({ message: 'Product removed'});
    } else {
      throw new Error()
    }
  } catch(error){
    console.log(error);
    res.status(404).json({ message: 'Product not found' });
  }
})

module.exports = router;