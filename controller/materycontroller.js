const dbcon = require('../database/connection')
const mysql = require('mysql2/promise')

exports.viewMatery = async (req, res) => {
    let qry = "SELECT * FROM materias;"
    const result = await dbcon.queryCmd(qry)

    let listProf = await dbcon.queryCmd("SELECT nome FROM professores;")


    res.render('./admin/matery', {findResult: result, displayName: userSession.nome, isCoord: userSession.coordenador, professors: listProf})

}

exports.createMatery = async (req, res) => {

    let prof = await dbcon.queryCmd("SELECT * FROM professores WHERE nome = '" + req.body.materyProf + "';")

    try {
        await dbcon.queryCmd("INSERT INTO materias (nome, termo, fk_professor) VALUES (" + mysql.escape(req.body.materyName) + "," + mysql.escape(req.body.materyTerm) + "," + mysql.escape(prof[0].chapa) + ");")

        res.redirect('/adm/matery')
    } catch (err) {
        console.log("Erro ao inserir matéria")
        console.log(err);
    }
    
}
