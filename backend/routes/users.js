const express = require('express')

const { 
    updateUserDefaultGroupId
} = require('../controllers/users')


const router = express.Router()
router.route('/').get(updateUserDefaultGroupId)
module.exports = router 
