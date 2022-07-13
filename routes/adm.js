const express = require('express')
const multer = require('../middleware/multer')
const router = express.Router()
const authcontroller = require('../controller/authcontroller')
const sessionCheck = require('../middleware/sessionCheck')
const database = require('../database/connection')
const mysql = require('mysql2/promise')
const flash = require('express-flash')


router.get('/', authcontroller.iflogin) // Ao entrar na rota principal /adm/, há uma verificação de sessão, se há ou não alguma sessão aberta.



router.post('/login', authcontroller.login) // Rota de login
router.post('/logout', authcontroller.logout ) // Rota de logout


router.get('/managefile', sessionCheck.check, function(req, res) {
    res.render('./admin/managefile')
})

// CRUD de arquivos.
router.get('/managefile/view', sessionCheck.check, async function(req, res, next){
    let result,
        qry = "SELECT arquivos.titulo, arquivos.criado_em, materias.nome FROM arquivos INNER JOIN materias, professores WHERE fk_materia = materias.id AND materias.fk_professor = professores.idra AND professores.nome = 'Vandrei';"

    result = await database.queryCmd(qry)
    // SELECT id, titulo FROM arquivos;
    // console.log(result);

    console.log(result);
    res.render('./admin/managefile', {findResult: result})
})

    // Adicionando arquivos
router.post('/managefile/create', sessionCheck.check, multer.single('file'), async function(req, res){
    if (req.file) {
        let result
        result = await database.queryCmd('INSERT INTO arquivos (titulo, arquivo, fk_materia) VALUES (' + mysql.escape(req.file.filename) + ',' + mysql.escape(req.file.destination) + ', 1);')

        req.flash('successUpload', 'Arquivo armazenado com sucesso!') // Mensagem flash para retorno para o usuário.
        return res.render('./admin/managefile', {successUpload: req.flash('successUpload')})
        // return res.send(req.file)
    }else{
        req.flash('errorUpload', 'Tipo de arquivo não suportado!')
        return res.render('./admin/managefile', {errorUpload: req.flash('errorUpload')})
    }

})

module.exports = router