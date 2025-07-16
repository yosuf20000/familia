const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()
const express = require('express')
const { generateSecretHash } = require('../utils/authUtils')
const jwt = require('jsonwebtoken')

const mydb = require('../db')




AWS.config.update({
    region: process.env.AWS_REGION, // fallback
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const cognito = new AWS.CognitoIdentityServiceProvider()



const logIn = async (req, res) => {
    const { identifier, password } = req.body;
  
    try {
      const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.CLIENT_ID,
        AuthParameters: {
          USERNAME: identifier,
          PASSWORD: password,
          SECRET_HASH: generateSecretHash(identifier, process.env.CLIENT_ID, process.env.COGNITO_CLIENT_SECRET)
        }
      };


  
      const response = await cognito.initiateAuth(params).promise();
      const { AccessToken, IdToken, RefreshToken } = response.AuthenticationResult;

      // Get user attributes
      const userData = await cognito.getUser({ AccessToken }).promise();
      const emailAttr = userData.UserAttributes.find(attr => attr.Name === 'email');
      const email = emailAttr ? emailAttr.Value : null; 
  
      req.session.loggedIn = true;
      req.session.tokens = { idToken: IdToken, accessToken: AccessToken, refreshToken: RefreshToken };
      req.session.email = email;    // <-- Always set email here
      req.session.loginTime = new Date().toISOString();
      req.session.isActive = true;
 

  
      req.session.save(err => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ message: 'Session save failed' });
        }
        // Optionally decode token for user info
        const decoded = jwt.decode(IdToken);
        return res.json({ message: 'Login successful', isOk: true, user: decoded });
      });
   
    } catch (err) {
      console.error('Login error:', err);
      return res.status(401).json({ error: err.message || 'Login failed' });
    }
  };
  
  
const logOut = async (req, res) => {

    const formatToMySQLDateTime = (date) => {
        return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
      };
    try {
        if (!req.session) return res.status(400).send('No session found');
        const logoutTime = new Date();
        const loginTime = new Date(req.session.loginTime); // Make sure it's a Date object
        const sessionId = req.sessionID;
        const formattedLoginTime  = formatToMySQLDateTime(req.session.loginTime);
        const email = req.session.email;
        const formattedLogoutTime  = formatToMySQLDateTime(new Date());
        const durationSeconds = Math.floor((logoutTime - loginTime) / 1000);
    
        // Save analytics before destroying session
        const sql = `
          INSERT INTO sessionAnalytics (session_id, email, login_time, logout_time, duration_seconds)
          VALUES (?, ?, ?, ?, ?)
        `;
        await mydb.execute(sql, [sessionId, email, formattedLoginTime, formattedLogoutTime, durationSeconds]);
    
        // Destroy session
        req.session.destroy(err => {
          if (err) return res.status(500).json({ message: 'Error destroying session', isOk: false });
    
          res.clearCookie('connect.sid');
          return res.json({ message: 'Logged out successfully', isOk: true });
        });
    
      } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: 'Logout failed', isOk: false });
      }
    };



const signup = async (req, res) => {
    const { email, password, fname, lname, username } = req.body
    console.log("here");



    try {
        const secretHash = generateSecretHash(username, process.env.CLIENT_ID, process.env.COGNITO_CLIENT_SECRET)
        const signUpParams = {
            ClientId: process.env.CLIENT_ID,
            Username: username,
            Password: password,
            UserAttributes: [
                { Name: 'email', Value: email },  // email is an attribute, username is NOT
            ],
            SecretHash: secretHash

        }

        const result = await cognito.signUp(signUpParams).promise()
        const userSub = result.UserSub


        // 
        const conn = await mydb.getConnection()
        await conn.execute(
            'INSERT INTO users (cognito_sub, fname, lname, email) VALUES (?, ?, ?, ?)',
            [userSub, fname, lname, email]
        )

        conn.release()

        res.status(201).json({ message: 'SignUp successful ', userSub })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Signup failed', details: err.message });
    }
}

module.exports = {
    logIn,
    logOut,
    signup
}