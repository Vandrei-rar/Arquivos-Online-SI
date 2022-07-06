const flash = require('express-flash')
const dbcon = require('../database/connection')

//Variavel teste (em desuso com banco de dados online).
let ra = 535187,
    senha = '2001',
    nome = 'Vands'

// Verificando se há uma sessão existente.
exports.iflogin = (req, res) => {

        if (req.session.login) { //Validando se o usuário está logado.
            res.render('./admin/dash', {displayName: nomes.nome})
        } 
        else {
            // req.session.destroy();

            // Passando pela resposta de RENDER o nome da flash message, e requerendo a mesma pela função req.flash()
            res.render('./admin/login', {errorMsg : req.flash('errorMsg')})
        }

}

// Bloco usado para testar o funcionamento de sessões (em desuso com banco de dados online).
/*exports.logintest = (req, res) => {
    if (req.body.ra == ra && req.body.senha == senha) {
        console.log("Logou");
        req.session.login = ra
        res.redirect('/adm')
    }else{
        console.log("Não logou");
        res.redirect('/adm')
    }

}*/

// Bloco que realiza a validação de login no sistema.
exports.login = (req, res) => {
    (async () => {
        const [nomes] = await dbcon.verifyIdentity(req.body.ra, req.body.senha); // Aguarda resposta da função verifyIndentity e armazena em um vetor.

        // Se houver um nome no BD que corresponde às credenciais utilizadas, significa que há um usuário para login.
        if (nomes) {
            req.session.login = nomes
            console.log("Usuário logado: " + nomes.nome)
            res.redirect('/adm') // Sempre retorna para a rota /adm principal, lá existe uma verificação que chama a iflogin para autorizar ou não o acesso.
        }
        else{
            req.flash('errorMsg', 'Credenciais inválidas!') // Definindo a flash message para erro de credenciais.
            console.log('Credenciais inválidas.');
            res.redirect('/adm');
        }

        global.nomes = nomes; // Tornando a variavel nomes global para uso no arquivo atual.

    })()
    
}

// Bloco usado para realizar o logout, destruindo a sessão atual.
exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/adm')
    console.log(nomes.nome + " Deslogou");
}