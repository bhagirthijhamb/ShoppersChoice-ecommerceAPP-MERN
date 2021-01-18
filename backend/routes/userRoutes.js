const express = require('express');
const router = express.Router();
const { findUserByEmail, findUserById } = require('./../controllers/userController');
const { generateToken } = require('./../utils/generateToken');
const { protect } = require('./../middlewares/authMiddleware');

router.post('/login', async(req, res) => {
  const { email, password } = req.body;

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
      res.status(400).json({ message: 'password and email so not match' });
      return;
    }
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    }
    res.json(userData);
  } catch(error){
    console.log(error)
  }
})

router.get('/profile', protect, async(req, res) => {
  try {
    const user = await findUserById(req.user._id);
    res.send(user);
  } catch(error){
    console.log(error);
  }
});

module.exports = router;