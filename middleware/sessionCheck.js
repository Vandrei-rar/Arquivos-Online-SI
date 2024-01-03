
exports.check = (req, res, next) => {
    if (req.session.view) { //Validando se o usuário está logado.
        next()
    } 
    else {
        req.flash('loginRequired', 'Autenticação obrigatória.')
        res.redirect('/adm')
    }
}