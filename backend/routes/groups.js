const express = require('express')
const router = express.Router()
const { 
    getGroupuUsers,
    getOneUserGroups,
    getGroupsInfo,
    createGroup,
    hasGroupAccess,
    viewInvites,
    respondIvaite,
    sendInvite

    
} = require('../controllers/groups')


router.route('/').get(getGroupuUsers)
router.route('/groups-info').get(getGroupsInfo)
router.route('/groupMmebers').get(getOneUserGroups)
router.route('/:groupTitle/access').get(hasGroupAccess)
router.route('/create').post(createGroup)
router.route('/invites/:inviteId/respond').post(respondIvaite)
router.route('/invites/send').post(sendInvite)
router.route('/invites/my-pending').get(viewInvites)




module.exports = router 
