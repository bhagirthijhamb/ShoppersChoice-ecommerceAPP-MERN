const Product  = require('./../models/productModel');

// @desc  Fetch all products
// @route GET /api/products
// @access Public
const getProducts = async(keyword, pageSize, page) => {
  try {
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1)); // empty object gives us everything
    return products;
  } catch(error){
    throw error;
  }
}

// @desc  Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id)
    return product;
  } catch(error){
    throw error;
  }
}

module.exports =  { getProducts, getProductById }