const express = require('express')
const multer = require('../middleware/multer')
const router = express.Router()
const authcontroller = require('../controller/authcontroller')
const sessionCheck = require('../middleware/sessionCheck')
const database = require('../database/connection')
const mysql = require('mysql2/promise')
const flash = require('express-flash')
const fs = require('fs')


router.get('/', authcontroller.iflogin) // Ao entrar na rota principal /adm/, há uma verificação de sessão, se há ou não alguma sessão aberta.



router.post('/login', authcontroller.login) // Rota de login
router.post('/logout', authcontroller.logout ) // Rota de logout


router.get('/managefile', sessionCheck.check, function(req, res) {
    res.render('./admin/managefile')
})

// CRUD de arquivos.
router.get('/managefile/view', sessionCheck.check, async function(req, res, next){
    let result,
        qry = "SELECT arquivos.titulo, arquivos.criado_em, materias.nome, materias.fk_professor FROM arquivos INNER JOIN materias, professores WHERE fk_materia = materias.id AND materias.fk_professor = professores.chapa AND professores.nome = " + mysql.escape(req.session.login.nome) + ";"

    result = await database.queryCmd(qry)
    // SELECT id, titulo FROM arquivos;

    // console.log(result);
    res.render('./admin/managefile', {findResult: result}) // Chamando a página managefile passando o parâmetro 'result' para manipular internamente no handlebars.

})

    // Adicionando arquivos
router.post('/managefile/create', sessionCheck.check, multer.single('file'), async function(req, res){
    if (req.file) {

        // Vetor constante materiaDetector serve para identificar qual a matéria correspondente do professor logado na sessão atual do sistema. Para realizar o insert corretamente e isolar arquivos por matérias e professores. Dessa forma um professor não consegue ver os arquivos dos outros, mantendo a ordem e organização.
        // Utiliza-se um vetor na mesma lógica do arquivo "authcontroller", a resposta do BD chega como um objeto, portanto deve-se manipular com um vetor.
        const [materiaDetector] = await database.queryCmd("SELECT materias.FK_PROFESSOR FROM materias INNER JOIN professores WHERE materias.FK_PROFESSOR = professores.CHAPA AND professores.nome = " + mysql.escape(req.session.login.nome) + ";")
        //console.log(materiaDetector);


        // Inserindo arquivos com seus nomes e respectivos locais no servidor, com a separação por matéria.
        await database.queryCmd('INSERT INTO arquivos (titulo, arquivo, fk_materia) VALUES (' + mysql.escape(req.file.originalname) + ',' + mysql.escape(req.file.destination) + ',' + await materiaDetector['FK_PROFESSOR'] + ');')

        req.flash('successUpload', 'Arquivo armazenado com sucesso!') // Mensagem flash de sucesso para retorno para o usuário.
        return res.render('./admin/managefile', {successUpload: req.flash('successUpload')})
        // return res.send(req.file)
    }else{
        req.flash('errorUpload', 'Tipo de arquivo não suportado!')// Mensagem flash de erro para retorno para o usuário.
        return res.render('./admin/managefile', {errorUpload: req.flash('errorUpload')}) 
    }

})

router.post('/managefile/delete/:titulo', sessionCheck.check, async function(req, res){ // Rota post para enviar a informação de deletar
    
    let fileName = req.params.titulo // Pelos parametros da URL captura-se o que vem no :titulo enviado pelo managefile.handlebars

    await fs.unlinkSync('./uploads/files/' + fileName) // Função assíncrona para exclusão de arquivos no diretório estático.
    await database.queryCmd("DELETE FROM arquivos WHERE titulo = " + mysql.escape(fileName)) // Função assíncrona para exclusão do registro no banco de dados.

    res.redirect('/adm/managefile/view')

})

module.exports = router