const dbcon = require('../database/connection')
const mysql = require('mysql2/promise')

exports.viewProfessors = async (req, res) => {
    let result, qry = "SELECT professores.nome, professores.sobrenome, professores.chapa FROM professores;"

    result = await dbcon.queryCmd(qry)

    res.render('./admin/prof', {findResult: result})
}

exports.createProfessors = async (req, res) => {
    let bla = await dbcon.queryCmd('INSERT INTO professores (chapa, senha, nome, sobrenome, coordenador) VALUES (' + mysql.escape(req.body.profId) + ',' + mysql.escape(req.body.defaultPassword) + ',' + mysql.escape(req.body.profName) + ',' + mysql.escape(req.body.profLastname) + ',' + 0 + ');')

    return res.redirect('/adm/prof')
}

exports.destroyProfessors = async (req, res) => {
    await dbcon.queryCmd("DELETE FROM professores WHERE chapa = " + mysql.escape(req.params.chapa))

    return res.redirect('/adm/prof')
}
