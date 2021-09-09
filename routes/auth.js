const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { body, check, validationResult } = require('express-validator');


// @route  GET api/auth
// @desc   GET Logged in User
// @access Private
router.get('/', auth, async (req, res) => {
  // This is a route that will have it's frontend pages render if the user is logged in. Therefore we need to protect this route.
  // Any route that needs protecting will need middleware to be brought into it. Do it by adding an extra parameter into the function.
  // Add the auth parameter to get function as shown above.
  try {
    const user = await User.findById(req.user.id).select('-password');
    // We assigned the jwt payload to req.user in our middleware. Now, we use this token to access our user, which is associated with this token.
    // Remember, that the credentials that the user used to register generated a jwt token, and that token contains the id of the usr in an 
    // encrypted form. So, we can use the token to access the id of the user and query the DB using the same.
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status('500').send('Server Error');
  }
});

// @route  POST api/auth
// @desc   Auth user get token
// @access Public
router.post('/', 
  body('email', 'Please put a valid email').isEmail(),
  body('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    // The above is the validation result that is obtained, after checking the conditions provided as params above.
    // You can access the errors object to show validation errors, if any.
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    
    const {email, password} = req.body;

    try {
      let user = await User.findOne({ email });

      if(!user) {
        return res.status('400').json({ msg: 'Invalid credentials'});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status('400').json({ msg: 'Invalid credentials' });
      }

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
      res.status('500').json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;