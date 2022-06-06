const express = require('express')
const router = express.Router()
const authcontroller = require('../controller/authcontroller');


router.get('/', authcontroller.iflogin)

router.post('/login', authcontroller.login2)
router.post('/logout', authcontroller.logout )

module.exports = router