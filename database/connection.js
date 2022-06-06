const mysql = require('mysql2/promise')
const dbconf = require('./db-conf.json')

async function connect() { // Funcão principal de conexão com MySQL utilizando "promessas".

    // Verifica se já existe uma conexão, se sim, retorna a conexão existente, senão abre uma nova conexão.
    if (global.connection && global.connection.state !== 'disconected') {
        return global.connection
    }

    const connection = mysql.createConnection({ // Credenciais puxadas do arquivo db-conf.json.
        host: dbconf.host,
        user: dbconf.user,
        password: dbconf.password,
        database: dbconf.database,
        port: dbconf.port
    })
    console.log("Banco de dados conectado!");
    
    // Atribuindo e retornando a conexão global.
    global.connection = connection
    return connection
}


// async function pesquisaProf() {
//     const search = await connect()

//     return await search.execute('SELECT * FROM `professores`;')
// }

async function verifyIdentity(ra, psswd) { // Indentificando o professor no BD. Com função assíncrona.
    const search = await connect() // Guardando a conexão do banco de dados na constante.
    
    // Query de busca, valida como logado quando o nome correspondente à RA e SENHA existir.
    var sqlquery = "SELECT nome FROM professores WHERE idra = " + mysql.escape(ra) + " AND senha = " + mysql.escape(psswd);
    const [rows] = await search.query(sqlquery) // Armazena a resposta do BD em vetor para melhor manipulação.

    exports.rows = rows; // Exportando as linhas para usar posteriormente.
    return rows; // Retornando a variavel exportada das linhas.
}

module.exports = {connect, verifyIdentity} // Exportando módulos para utilização em demais partes do sistema.