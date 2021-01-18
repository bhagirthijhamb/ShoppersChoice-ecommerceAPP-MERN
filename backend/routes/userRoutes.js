const express = require('express');
const router = express.Router();
const { findUserByEmail } = require('./../controllers/userController');

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
        token: null
      }
    res.json(userData);
  } catch(error){
    console.log(error)
  }
})

module.exports = router;