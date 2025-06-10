const express = require('express')
const { logIn, logOut } = require('../controllers/user-sessions')
const router = express.Router()

router.route('/login').post(logIn)
router.route('/logout').post(logOut)


module.exports = router 
