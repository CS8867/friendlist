const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token
  if(!token) {
    return res.status('401').json({ msg: 'No token. Auth denied' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    // Once the token is verified, the payload is populated in decoded. The payload just contains a user object
    // containing an id field. We assign this decode.user to req.user. This will be used back in our auth.js routes
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}