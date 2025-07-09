const express = require('express')
const router = express.Router()
const { 
    last5TranscationsByGroup,
    membersStats,
    indivdualGroupStats
    
} = require('../controllers/statics')


router.route('/last5/:groupTitle').get(last5TranscationsByGroup)
router.route('/members-stats/:groupTitle').get(membersStats)
router.route('/group-stats/:groupTitle').get(indivdualGroupStats)





module.exports = router 
