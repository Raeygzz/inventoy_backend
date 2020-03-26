const express = require('express');
const router = express.Router();
const User = require('../../models/user');


// Create User   To3bxQUsExq0dDNm
router.post('/create', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  const confirmPassword = req.body.confirmPassword;

  if (!user.email || !user.password || !confirmPassword) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Please include a email or password' });
    
  } else if(user.password != confirmPassword) {
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
    if(err.keyValue.email) {
      res.json({ statusCode: 200, status: false, msg: err.keyValue.email + ' User already exists' })

    } else {
      res.json({ statusCode: 200, status: false, err: err, msg: 'User not saved' })
    }
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
    res.json({ statusCode: 200, status: false, err: err, msg: 'No user found.' })
  }
})


// Change Password
router.post('/changePassword/:email', async (req, res) => {
  const userEmail = req.params.email;

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Please include all required fields' });
    
  } else if(newPassword !== confirmNewPassword) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Password doesnot match' });
  }

  try {
    const newChangePassword = await User.findOneAndUpdate({ email: userEmail, password: oldPassword }, { $set: { password: confirmNewPassword }})
    if(newChangePassword != null) {
      res.json({statusCode: 200, status: true, msg: 'Password successfully changed' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Password not changed' })
    }

  } catch(err) {
    res.json({ statusCode: 200, status: false, err: err, msg: 'Password not changed' })
  }
});


module.exports = router;
