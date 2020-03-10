const express = require('express');
const router = express.Router();
const User = require('../../models/user');


// Create User   To3bxQUsExq0dDNm
router.post('/create', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });

  if (!user.email || !user.password || !user.confirmPassword) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Please include a email or password' });
    
  } else if(user.password != user.confirmPassword) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Password doesnot match' });
  }

  try {
    const newUser = await user.save()
    if(newUser != null) {
      res.json({statusCode: 200, status: true, msg: 'User successfully saved' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'User not saved' })
    }

  } catch(err) {
    if(err) throw err;
  }
});


//login user
router.post('/login', async (req, res) => {
  email = req.body.email,
  password = req.body.password

  if(!email || !password) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Please fill all the required fields.' });
  }

  try {
    const loginUser = await User.findOne({ email: email, password: password });
    if(loginUser != null) {
      res.json({ statusCode: 200, status: true, msg: 'User successfully loggedin' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'No user found.' })
    }
    
  } catch(err) {
    if(err) throw err;
  }

})


module.exports = router;
