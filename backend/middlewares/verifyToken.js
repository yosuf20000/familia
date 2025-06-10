const jwksClient = require('jwks-rsa')
const jwt = require ('jsonwebtoken')

const ISSUER = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_POOL_ID}`

const client = jwksClient({
    jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_POOL_ID}/.well-known/jwks.json`
  }); 

const verifyToken = async (req, res, next) => {
    const { idToken, accessToken, refreshToken } = req.session.tokens;


    function getKey(header, callback){
        client.getSigningKey(header.kid, (err, key) => {
            const signingKey = key.getPublicKey(); 
            callback(null, signingKey)
        }) 

    }

    jwt.verify(idToken,getKey, {
        audience: null, 
        issuer:ISSUER, 
        algorithms: ['RS256']
    }, (err, decodedId) => {
        if (err) return res.status(401).send('Invalid ID token'); 

        jwt.verify(accessToken, getKey, { issuer: ISSUER, algorithms: ['RS256'] }, (err2, decodedAccess) => {
            if (err2) return res.status(401).json({ message: 'Invalid access token' });
      
            // Attach decoded tokens
            req.tokens = {
              idToken: decodedId,
              accessToken: decodedAccess,
              refreshToken // not decoded – treat as opaque
            };
      
            next();
          });
    })
    
}

module.exports = verifyToken