const User = require('./../models/userModel');

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
const findUserByEmail = async(email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch(error){
    throw error;
  }
}

module.exports = { findUserByEmail };