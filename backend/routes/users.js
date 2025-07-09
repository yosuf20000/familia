const express = require('express')

const { 
    updateUserDefaultGroupId,
    searchUsers,
    getUserByEmail
} = require('../controllers/users')


const router = express.Router()
router.route('/').get(updateUserDefaultGroupId)
router.route('/search').get(searchUsers)
router.route('/get-user-by-email').get(getUserByEmail)



module.exports = router 
