const User = require('./../models/userModel');

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = async(req, res) => {
  try {
    const { email, password } = req.body
   res.send({email, password});
  } catch(error){
    throw error;
  }
}

module.exports = { authUser };