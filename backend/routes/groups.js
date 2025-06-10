const express = require('express')
const router = express.Router()
const { 
    getGroupuUsers,
    getOneUserGroups,
    getGroupsInfo
} = require('../controllers/groups')


router.route('/').get(getGroupuUsers)
router.route('/groups-info').get(getGroupsInfo)
router.route('/groupMmebers').get(getOneUserGroups)

module.exports = router 
