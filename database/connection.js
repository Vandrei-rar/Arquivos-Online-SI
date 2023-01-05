const mysql = require('mysql2/promise')
const dbconf = require('./db-conf.json')


async function connect() { // Funcão principal de conexão com MySQL utilizando "promessas".

    // Verifica se já existe uma conexão, se sim, retorna a conexão existente, senão abre uma nova conexão.
    if (global.connection && global.connection.state !== 'disconected') {
        return global.connection
    }

    try {
        const connection = await mysql.createConnection({ // Credenciais puxadas do arquivo db-conf.json.
            host: dbconf.host,
            user: dbconf.user,
            password: dbconf.password,
            database: dbconf.database,
            port: dbconf.port
        })

        // Atribuindo e retornando a conexão global.
        global.connection = connection
        console.log("Banco de dados conectado!");
        return connection

    } catch (err) {
        console.log("Erro na conexão do banco de dados -> " + err);

    }

}


// async function pesquisaProf() {
//     const search = await connect()

//     return await search.execute('SELECT * FROM `professores`;')
// }

async function verifyIdentity(chapa, psswd) { // Indentificando o professor no BD. Com função assíncrona.
    const search = await connect() // Guardando a conexão do banco de dados na constante.
    
    try {
        // Query de busca, valida como logado quando o nome correspondente à RA e SENHA existir.
        var sqlquery = "SELECT nome, coordenador FROM professores WHERE chapa = " + mysql.escape(chapa) + " AND senha = " + mysql.escape(psswd);
        const [rows] = await search.query(sqlquery) // Armazena a resposta do BD em vetor para melhor manipulação.

        exports.rows = rows; // Exportando as linhas para usar posteriormente.
        return rows; // Retornando a variavel exportada das linhas.

    } catch (err) {
        console.log("Erro de validação de usuário -> " + err);
    }

}

async function queryCmd(cmd) {
    const conn = await connect()

    try {
        const [response] = await conn.query(cmd)
        console.log(response);
        exports.result = response
        return response
    } catch (err) {
        console.log("Erro ao executar uma query -> " + err);
    }

}

module.exports = {queryCmd, connect, verifyIdentity} // Exportando módulos para utilização em demais partes do sistema.