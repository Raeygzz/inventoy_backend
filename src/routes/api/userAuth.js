const express = require('express');
const router = express.Router();

const UserAuth = require('../../models/userAuth');


// Create user account route
router.post('/createAccount', async (req, res) => {
  try {
    const createAccount = new UserAuth({
      emailAddress: req.body.emailAddress,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword 
    })

    console.log('userAuth ==> ', createAccount)
    if(createAccount.emailAddress != null && createAccount.password != null && createAccount.confirmPassword != null) {
      await createAccount.save()
      res.status(200).json({ status: 200, msg: 'Account created successfully' })
      
    } else {
      res.status(400).json({ status: 400, msg: 'Unable to create account'})
    }
  } catch(err) {
      res.status(400).json({ status: 400, msg: err })
  }
})


module.exports = router;
