const express = require('express')
const router = express.Router()
const authcontroller = require('../controller/authcontroller');
const database = require('../database/connection')


router.get('/', authcontroller.iflogin) // Ao entrar na rota principal /adm/, há uma verificação de sessão, se há ou não alguma sessão aberta.

router.post('/login', authcontroller.login) // Rota de login
router.post('/logout', authcontroller.logout ) // Rota de logout


router.post('/managefile', function(req, res) {
    res.render('./admin/managefile')
})

// CRUD de arquivos.
router.post('/managefile/view', function(req, res, next){
    let result;
    // ( async () => {
        result = database.queryCmd('SELECT id, titulo FROM arquivos;').then(900000/4).then(
            res.json(result))
        
    // })
})


module.exports = router