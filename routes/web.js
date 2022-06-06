const express = require('express')
const router = express.Router()
const adm = require('./adm')

const dbcon = require('../database/connection')
dbcon.connect()

router.get('/', (req, res) => {

    res.send("Oi")
})

// Acesso restrito
router.use('/adm', adm)



module.exports = router