const express = require('express')
const router = express.Router()
const authcontroller = require('../controller/authcontroller');
const database = require('../database/connection')


router.get('/', authcontroller.iflogin) // Ao entrar na rota principal /adm/, há uma verificação de sessão, se há ou não alguma sessão aberta.

router.post('/login', authcontroller.login) // Rota de login
router.post('/logout', authcontroller.logout ) // Rota de logout


router.get('/managefile', function(req, res) {
    res.render('./admin/managefile')
})

// CRUD de arquivos.
router.get('/managefile/view', async function(req, res, next){
    let result;
    result = await database.queryCmd('SELECT id, titulo FROM arquivos;')
    console.log(result);
    res.send(result)
})


module.exports = router