const express = require('express')
const AWS = require('aws-sdk')
const { generateSecretHash } = require('../utils/authUtils')
require('dotenv').config()
const router = express.Router()
const jwt = require ('jsonwebtoken')



AWS.config.update({ region: 'ap-south-1' });

const cognito = new AWS.CognitoIdentityServiceProvider()

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: generateSecretHash(
                    email,
                    process.env.CLIENT_ID,
                    process.env.COGNITO_CLIENT_SECRET
                )
            }
        }

        const result = await cognito.initiateAuth(params).promise()
            .then(response => {
                console.log('Login success:');
                const { IdToken, AccessToken, RefreshToken } = response.AuthenticationResult;


                req.session.loggedIn = true;
                req.session.tokens = {
                    idToken: IdToken,
                    accessToken: AccessToken,
                    refreshToken: RefreshToken
                };
                req.session.email
                req.session.loginTime = new Date().toISOString()
                req.session.isActive = true;






                console.log(req.session)

                req.session.save(err => {
                    if (err) {
                        console.error('Session save error:', err);
                        return res.status(500).json({ message: 'Session save failed' });
                    }
                        const decoded = jwt.decode(req.session?.tokens?.idToken)
                    

                    return res.json({ message: 'Login successful', isOk: true, user:decoded });
                })





                // res.json({ message: 'Login successful' });
            })

    } catch (err) {

        console.error('Login error:', err);
        return res.status(401).json({ error: err.message || 'Login failed' });

    }
})

module.exports = router
