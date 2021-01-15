const express = require('express');
const router = express.Router();
const Product  = require('./../models/productModel');

const getProducts = async() => {
  try {
    const products = await Product.find({}); // empty object gives us everything
    return products;
  } catch(error){
    throw error;
  }
}
const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId)
    return product;
  } catch(error){
    throw error;
  }
}

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

module.exports = router;