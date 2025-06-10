const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()
const express = require('express')
const { generateSecretHash } = require('../utils/authUtils')
require('dotenv').config()
const jwt = require('jsonwebtoken')


AWS.config.update({ region: 'ap-south-1' });
const cognito = new AWS.CognitoIdentityServiceProvider()



const logIn = async (req, res) => {
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

        await cognito.initiateAuth(params).promise()
            .then(response => {
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



                req.session.save(err => {
                    if (err) {
                        console.error('Session save error:', err);
                        return res.status(500).json({ message: 'Session save failed' });
                    }
                    const decoded = jwt.decode(req.session?.tokens?.idToken)

                    dynamodb.update({
                        TableName: "sessions",
                        Key: { id: `sess:${req.sessionID}` },
                        UpdateExpression: 'SET email = :e, loginTime = :l, isActive = :a',
                        ExpressionAttributeValues: {
                            ':e': email,
                            ':l': req.session.loginTime,
                            ':a': true
                        }
                    }).promise()


                    return res.json({ message: 'Login successful', isOk: true, user: decoded });
                })


            })



    } catch (err) {

        console.error('Login error:', err);
        return res.status(401).json({ error: err.message || 'Login failed' });

    }


}

const logOut = async (req, res) => {
    try {
        const { email } = req.body;
        if (!req.session) return res.status(400).send('No session found');
        // req.session.logoutTime = new Date().toISOString();
        req.session.isActive = false;
        const sessionId = req.sessionID;
        const loginTime = req.session.loginTime;        

        req.session.save(async () => {

            dynamodb.put({
                TableName: 'SessionAnalytics',
                Item: {
                    id: sessionId,
                    email: email,
                    loginTime,
                    logoutTime: new Date().toISOString(),
                    durationSeconds: Math.floor((new Date() - new Date(loginTime)) / 1000)
                }
            }).promise();

        });

        req.session.destroy(err => {
            if (err) return res.status(500).json({ message: 'Error destroying session', isOk:false});
            res.clearCookie('connect.sid'); // VERY IMPORTANT
            res.json({ message: 'Logged out', isOk: true });
        });


    } catch (error) {
        return res.status(401).json({ message: err.message || 'Logout failed', isOk:false });

    }

}

module.exports = {
    logIn,
    logOut
}