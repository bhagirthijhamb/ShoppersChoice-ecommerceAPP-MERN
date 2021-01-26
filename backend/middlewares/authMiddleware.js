const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

const protect = async (req, res, next) => {
  let token;
  try {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      // console.log('token found');
      token = req.headers.authorization.split(' ')[1];
      if(!token){
        res.status(401).json({ message: 'authorization required' })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET );
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } else {
      throw error;
    }
  } catch(error){
    res.status(403).json({ message: 'authorization required'});
  }
}

const admin = async (req, res, next) => {
  try {
    if(req.user && req.user.isAdmin){
      next()
    } else {
      throw new Error()
    }
  } catch(error){
    res.status(401).json({ message: 'Not authorized as an admin '});
  }
}

module.exports = { protect, admin };