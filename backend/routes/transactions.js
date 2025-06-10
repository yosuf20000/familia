const express = require('express')
const { 
    getAlltransactions,
    getTransactionsByUser, 
    makeTransaction
} = require('../controllers/transactions')
const router = express.Router()



router.route('/').get(getAlltransactions)
router.route('/user').get(getTransactionsByUser)
router.route('/make').post(makeTransaction) 


module.exports = router 