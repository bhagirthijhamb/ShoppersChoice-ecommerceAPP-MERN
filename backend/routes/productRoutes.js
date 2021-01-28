const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();
const { protect, admin } = require('./../middlewares/authMiddleware');
const { getProducts, getProductById } = require('./../controllers/productController');

router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {}
    const products = await getProducts(keyword)
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

// Create a product
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.json(createdProduct);
  } catch(error){
    console.log(error);
    res.status(404).json({ message: 'Something went wrong' });
  }
})

// Update a product
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id)
    if(product){
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand= brand;
      product.category= category;
      product.countInStock = countInStock;

    const updatedProduct = await product.save()
    res.json(updatedProduct);
    } else {
      throw new Error();
    }
  } catch(error){
    console.log(error);
    res.status(404).json({ message: 'Product not found' });
  }
})

// Create new review
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { comment, rating } = req.body;

    const product = await Product.findById(req.params.id)
    console.log(product);
    if(product){
      const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

      if(alreadyReviewed){
        throw new Error();
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      }

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)/ product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added'})
    }
  } catch(error){
    console.log(error);
    res.status(404).json({ message: 'Product already reviewed' });
  }
})

module.exports = router;