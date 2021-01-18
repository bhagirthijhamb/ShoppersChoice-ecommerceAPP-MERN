const express = require('express');
const router = express.Router();
const { authUser } = require('./../controllers/userController');

router.post('/login', async(req, res) => {
  try{
    const user = await authUser(req, res);
  } catch(error){
    console.log(error)
  }
})

module.exports = router;