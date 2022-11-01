const dbcon = require('../database/connection')
const mysql = require('mysql2/promise')
const fs = require('fs')

exports.showFiles = async (req, res) => {

    let result, qry
    qry = "SELECT titulo, fk_materia, arquivo FROM arquivos"

    result = await dbcon.queryCmd(qry)

    res.render('./public/index', {findResult: result})
}

exports.downloadFile = (req, res) => {

    let fileName = req.params.titulo,
        filePath = req.params.arquivo

    console.log('fileController.download: started')

    const file = fs.createReadStream('./uploads/files')
    res.setHeader('Content-Disposition', 'attachment: filename="' + fileName + '"')
    file.pipe(res)

}