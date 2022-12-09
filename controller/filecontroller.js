const dbcon = require('../database/connection')
const mysql = require('mysql2/promise')
const fs = require('fs')

exports.viewFiles = async (req, res) =>{
    let result,
        qry = "SELECT arquivos.titulo, arquivos.criado_em, materias.nome, materias.fk_professor FROM arquivos INNER JOIN materias, professores WHERE fk_materia = materias.id AND materias.fk_professor = professores.chapa AND professores.nome = " + mysql.escape(req.session.login.nome) + ";"

    result = await dbcon.queryCmd(qry)
    // SELECT id, titulo FROM arquivos;

    // console.log(result);
    res.render('./admin/managefile', {findResult: result, displayName: nomes.nome}) // Chamando a página managefile passando o parâmetro 'result' para manipular internamente no handlebars.
}

exports.createFiles = async (req, res) => {
    if (req.file) {
        try {
            // Vetor constante materiaDetector serve para identificar qual a matéria correspondente do professor logado na sessão atual do sistema. Para realizar o insert corretamente e isolar arquivos por matérias e professores. Dessa forma um professor não consegue ver os arquivos dos outros, mantendo a ordem e organização.
            // Utiliza-se um vetor na mesma lógica do arquivo "authcontroller", a resposta do BD chega como um objeto, portanto deve-se manipular com um vetor.
            const [materiaDetector] = await dbcon.queryCmd("SELECT materias.FK_PROFESSOR FROM materias INNER JOIN professores WHERE materias.FK_PROFESSOR = professores.CHAPA AND professores.nome = " + mysql.escape(req.session.login.nome) + ";")
            //console.log(materiaDetector);

            // Inserindo arquivos com seus nomes e respectivos locais no servidor, com a separação por matéria.
            await dbcon.queryCmd('INSERT INTO arquivos (titulo, arquivo, fk_materia) VALUES (' + mysql.escape(req.file.originalname) + ',' + mysql.escape(req.file.destination) + ',' + await materiaDetector['FK_PROFESSOR'] + ');')

            req.flash('successUpload', 'Arquivo armazenado com sucesso!') // Mensagem flash de sucesso para retorno para o usuário.
            return res.redirect('/adm/managefile')

        } catch (err) {
            console.log("Erro detectado: ", err)
            req.flash('err', 'Ocorreu algum erro')// Mensagem flash de erro para retorno para o usuário.
            return res.render('./admin/managefile', {errorUpload: req.flash('err')}) 
        }
        
    }else{
        req.flash('errorUpload', 'Tipo de arquivo não suportado!')// Mensagem flash de erro para retorno para o usuário.
        return res.render('./admin/managefile', {errorUpload: req.flash('errorUpload')}) 
    }
}

exports.destroyFiles = async (req, res) => {
    let fileName = req.params.titulo // Pelos parametros da URL captura-se o que vem no :titulo enviado pelo managefile.handlebars

    await fs.unlinkSync('./uploads/files/' + fileName) // Função assíncrona para exclusão de arquivos no diretório estático.
    await dbcon.queryCmd("DELETE FROM arquivos WHERE titulo = " + mysql.escape(fileName)) // Função assíncrona para exclusão do registro no banco de dados.

    res.redirect('/adm/managefile')
}