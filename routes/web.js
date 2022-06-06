const express = require('express')
const router = express.Router()
const adm = require('./adm')

const dbcon = require('../database/connection')
dbcon.connect() // Abrindo conexão na rota principal do sistema, utilizado para exibir os materiais à usuários que não estão necessariamente logados.

router.get('/', (req, res) => {

    res.send("Oi")
})

// Acesso restrito
router.use('/adm', adm)



module.exports = router