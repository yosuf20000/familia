const express = require('express')
const { 
    getAlltransactions,
    getTransactionsByUser, 
    makeTransaction,
    userTransactionsStatics,
    updateTransactionStatusToApproved
} = require('../controllers/transactions')
const router = express.Router()



router.route('/').get(getAlltransactions)
router.route('/user').get(getTransactionsByUser)
router.route('/user-statics').get(userTransactionsStatics)
router.route('/make').post(makeTransaction) 
router.route('/approve-transaction').post(updateTransactionStatusToApproved) 




module.exports = router 