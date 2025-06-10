const express = require('express')
const { 
    getLoanByUser
} = require('../controllers/loans')
const router = express.Router()



// router.route('/').get(getAlltransactions)
router.route('/user').get(getLoanByUser)


module.exports = router 