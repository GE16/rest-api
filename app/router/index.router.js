const express = require('express')
const router = express.Router()

const r_user_api = require("./user.router")
const r_group_api = require("./group.router")

router.use('/api/user', r_user_api)
router.use('/api/group', r_group_api)

module.exports = router