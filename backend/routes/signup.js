const express = require('express')
const AWS  = require('aws-sdk')
const pool = require('../db')
const { generateSecretHash } = require('../utils/authUtils')
require('dotenv').config()
const router= express.Router()

const cognito = new AWS.CognitoIdentityServiceProvider({
    region: process.env.COGNITO_REGION

})


router.post('/signup', async (req, res) => {
    const {email, password, fname, lname} = req.body
    

    try {
        const secretHash = generateSecretHash(email, process.env.CLIENT_ID, process.env.COGNITO_CLIENT_SECRET)
        const signUpParams = {
            ClientId: process.env.CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [
                { Name: 'email', Value: email},
               

            ],
            SecretHash: secretHash

        }

        const result = await cognito.signUp(signUpParams).promise()
        const userSub = result.UserSub
        

        // 
        const conn = await pool.getConnection()
        await conn.execute(
            'INSERT INTO users (cognito_sub, fname, lname, email) VALUES (?, ?, ?, ?)', 
            [userSub, fname, lname, email]
        )

        conn.release()

        res.status(201).json({message:'SignUp successful ', userSub})

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Signup failed', details: err.message });
    }
})

module.exports = router  