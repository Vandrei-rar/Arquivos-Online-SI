const dbcon = require('../database/connection')

// Verificando se há uma sessão existente.
exports.islogged = (req, res) => {

    if (req.session.view){
        res.render('./admin/dash', {displayName: userSession.nome, isCoord: userSession.coordenador})
    }
    else {
        // Passando pela resposta de RENDER o nome da flash message, e requerendo a mesma pela função req.flash()
        res.render('./admin/login', {errorMsg : req.flash('errorMsg')})
    }
}

// Bloco que realiza a validação de login no sistema.
exports.login = (req, res) => {
    try {
        (async () => {
            const [userSession] = await dbcon.verifyIdentity(req.body.chapa, req.body.senha); // Aguarda resposta da função verifyIndentity e armazena em um vetor.
            // Se houver um nome no BD que corresponde às credenciais utilizadas, significa que há um usuário para login.
            if (userSession) {
                req.session.view = userSession
            }
            else{
                req.flash('errorMsg', 'Credenciais inválidas!') // Definindo a flash message para erro de credenciais.
            }

            res.redirect('/adm') // Sempre retorna para a rota /adm principal, lá existe uma verificação que chama a iflogin para autorizar ou não o acesso.
            global.userSession = userSession; // Tornando a variavel nomes global para uso no arquivo atual.

        })()
    } catch (err) {
        res.redirect('/')
    }    
}

// Bloco usado para realizar o logout, destruindo a sessão atual.
exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/adm')
}