const express = require('express')
const router = express.Router()
const adm = require('./adm')
const publicontroller = require('../controller/publicontroller')

const dbcon = require('../database/connection')
dbcon.connect() // Abrindo conexão na rota principal do sistema, utilizado para exibir os materiais à usuários que não estão necessariamente logados.

// Acesso público
router.get('/', publicontroller.showFiles)
router.get('/download', publicontroller.downloadFile)

// Acesso restrito
router.use('/adm', adm)


module.exports = router