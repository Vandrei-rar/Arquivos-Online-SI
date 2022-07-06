const express = require('express')
const flash = require('express-flash')



exports.check = (req, res, next) => {
    if (req.session.login) { //Validando se o usuário está logado.
        next()
    } 
    else {
        req.flash('loginRequired', 'Autenticação obrigatória.')
        res.redirect('/adm')
    }
}