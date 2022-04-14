//Variavel teste
let ra = 535187,
    senha = 'vand',
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

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/adm')
    console.log("Deslogou");
}