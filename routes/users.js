const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// @route  POST api/users
// @desc   Register Users
// @access Public
router.post(
  '/',
  body('name', 'Please add name').not().isEmpty(),
  body('email', 'Please put a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email });  //Normal syntax would be email: email, but ES6 is awesome so...

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
      }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({token});
      });

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;

// body('name').not().isEmpty(),
// body('email').isEmail(),
// body('password').isLength({ min: 5 })

// check('name', 'Please add name').not().isEmpty(),
//   check('email', 'Please put a valid email').isEmail(),
//   check('password', 'Please enter a password with 6 or more characters').isLength()({min: 6}),

//The above is the old code that you will find Brad working with, however, the express validator docs have updated.
//Use the body syntax mentioned above the check syntax.