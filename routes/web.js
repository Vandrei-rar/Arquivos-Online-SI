const express = require('express')
const router = express.Router()
const adm = require('./adm')

router.get('/', (req, res) => {
    res.send("Oi")
})

// Acesso restrito
router.use('/adm', adm)



module.exports = router