const express = require('express')
const multer = require('../middleware/multer')
const router = express.Router()
const authcontroller = require('../controller/authcontroller')
const filecontroller = require('../controller/filecontroller')
const profcontroller = require('../controller/profcontroller')
const materycontroller = require('../controller/materycontroller')
const sessionCheck = require('../middleware/sessionCheck')

router.get('/', authcontroller.islogged) // Ao entrar na rota principal /adm/, há uma verificação de sessão, se há ou não alguma sessão aberta.

router.post('/login', authcontroller.login) // Rota de login
router.post('/logout', authcontroller.logout ) // Rota de logout

// Controle de arquivos
router.get('/managefile', sessionCheck.check, filecontroller.viewFiles)
router.post('/managefile/create', sessionCheck.check, multer.single('file'), filecontroller.createFiles )
router.post('/managefile/delete/:titulo', sessionCheck.check, filecontroller.destroyFiles)

// Controle professores
router.get('/prof', sessionCheck.check, profcontroller.viewProfessors)
router.post('/prof/create', sessionCheck.check, profcontroller.createProfessors )
router.post('/prof/delete/:chapa', sessionCheck.check, profcontroller.destroyProfessors )

// Controle de matérias
router.get('/matery', sessionCheck.check, materycontroller.viewMatery )
router.post('/matery/create', sessionCheck.check, materycontroller.createMatery )
router.post('/matery/delete/:id', sessionCheck.check, materycontroller.destroyMatery )


module.exports = router