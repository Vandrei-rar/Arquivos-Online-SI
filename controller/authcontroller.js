const req = require('express/lib/request');
const dbcon = require('../database/connection')

//Variavel teste
let ra = 535187,
    senha = '2001',
    nome = 'Vands'


exports.iflogin = (req, res) => {
    if (req.session.login) { //Validando se o usuário está logado.
        res.render('./admin/dash');
      } 
      else {
        // req.session.destroy();
        res.render('./admin/login');
      }
}

exports.login = (req, res) => {
    if (req.body.ra == ra && req.body.senha == senha) {
        console.log("Logou");
        req.session.login = ra
        res.redirect('/adm')
    }else{
        console.log("Não logou");
        res.redirect('/adm')
    }

}

exports.login2 = (req, res) => {
    (async () => {
        const [nomes] = await dbcon.verifyIdentity(req.body.ra, req.body.senha);

        if (nomes) {
            req.session.login = nomes
            console.log("Usuário logado: " + nomes.nome)
            res.redirect('/adm')
        }
        else{
            console.log('Credenciais inválidas.');
            res.redirect('/adm');
        }

        global.nomes = nomes;

    })()
    
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/adm')
    console.log(nomes.nome + " Deslogou");
}