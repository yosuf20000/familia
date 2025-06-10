function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

const jwksClient = require('jwks-rsa')
const jwt = require ('jsonwebtoken')

function checkAuth(req, res, next) {    
  try {
    if (req.session?.tokens?.idToken) {
      // Optionally: Add token expiration check
      
      const decoded = jwt.decode(req.session?.tokens?.idToken)
      return res.status(200).json({ user: decoded, isOk: true});

      // return next(); 
    }
    return res.status(401).json({ message: 'Not authenticated', isOk:false });
    
  } catch (error) {
    return res.status(401).json({ message: 'Server error', isOk:false });

  }

  }
  

module.exports = checkAuth