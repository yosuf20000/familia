const express = require('express')
const { logIn, logOut, signup } = require('../controllers/user-sessions')
const router = express.Router()

router.route('/login').post(logIn)
router.route('/logout').post(logOut)
router.route('/signup').post(signup)


module.exports = router 
