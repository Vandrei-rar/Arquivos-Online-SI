const dbcon = require('../database/connection')
const path = require('path');
const mysql = require('mysql2/promise')
const fs = require('fs')

exports.showFiles = async (req, res) => {

    let result, qry
    qry = "SELECT titulo, fk_materia, arquivo FROM arquivos"

    result = await dbcon.queryCmd(qry)

    res.render('./public/index', {findResult: result})
}

exports.downloadFile = async (req, res) => {

    let fileName = 'note_view.png',
        filePath = path.join("uploads/files/")

    await res.download(filePath + fileName)

}