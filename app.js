const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const route = require('./routes/web')
const flash = require('express-flash')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Set template
app.engine('handlebars', exphbs({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

// app.use(flash({ sessionKeyName: 'flashMessage', useCookieSession: true }));
app.use(flash())

// Config session
app.use(session({secret: 'c6712598023cfa20882b2667006f6c23d8adad65'}))

app.use('/', route)

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})