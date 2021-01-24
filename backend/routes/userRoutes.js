const express = require('express');
const router = express.Router();
const { findUserByEmail, findUserById, createUser } = require('./../controllers/userController');
const { generateToken } = require('./../utils/generateToken');
const { protect } = require('./../middlewares/authMiddleware');
const User = require('../models/userModel');
const { findById } = require('../models/userModel');

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await findUserByEmail(email)
    if(userExists){
      res.status(400).json({ message:  `email ${email} already exists`});
      return;
    }
    // create the user in the db
    const user = await createUser({ name, email, password });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } catch(error){
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

// Validate email and password
// and then send a token
router.post('/login', async(req, res) => {
  const { email, password } = req.body;
  // console.log(email, password)
  try{
    const user = await findUserByEmail(email);
    if(!user){
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }
    // console.log(user)
    // console.log(password)
    const isMatch = await user.matchPasswords(password);
    if(!isMatch){
      res.status(400).json({ message: 'password and email do not match' });
      return;
    }
    const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    }
    res.json(userData);
  } catch(error){
    // console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
})

router.get('/profile', protect, async(req, res) => {
  try {
    const user = await findUserById(req.user._id);
    res.send(user);
  } catch(error){
    console.log(error);
    res.status(500).json({ message: 'User not found' });
  }
});

router.put('/profile', protect, async(req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email;
      if(req.body.password){
        user.password = req.body.password
      }
      const updatedUser = await user.save();
      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id)
      })
    }
  } catch(error){
    console.log(error)
    res.status(404).json({ message: 'User not found'})
  }
})

module.exports = router;