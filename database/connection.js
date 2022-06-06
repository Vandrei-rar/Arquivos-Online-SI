const mysql = require('mysql2/promise')
const dbconf = require('./db-conf.json')

async function connect() {

    if (global.connection && global.connection.state !== 'disconected') {
        return global.connection
    }

    const connection = mysql.createConnection({
        host: dbconf.host,
        user: dbconf.user,
        password: dbconf.password,
        database: dbconf.database,
        port: dbconf.port
    })
    console.log("Banco de dados conectado!");
    global.connection = connection
    return connection
}


// async function pesquisaProf() {
//     const search = await connect()

//     return await search.execute('SELECT * FROM `professores`;')
// }

async function verifyIdentity(ra, psswd) {
    const search = await connect()
    
    var sqlquery = "SELECT nome FROM professores WHERE idra = " + mysql.escape(ra) + " AND senha = " + mysql.escape(psswd);
    const [rows] = await search.query(sqlquery)

    exports.rows = rows;
    return rows;
}

module.exports = {connect, verifyIdentity}