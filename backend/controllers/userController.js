const User = require('./../models/userModel');

// @desc  Register a new user
// @route POST /api/users
// @access Public
const createUser = async({ name, email, password }) => {
  try {
    const newUser = await User.create({ name, email, password });
    return newUser;
  } catch(error){
    throw error;
  }
}

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

// @desc  GET user profile
// @route GET /api/users/profile
// @access  Private
const findUserById = async(id) => {
  try {
    const user = await User.findById(id);
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    };
  } catch(error){
    throw error;
  }

}



module.exports = { findUserByEmail, findUserById, createUser };