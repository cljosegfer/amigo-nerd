// express
const express = require('express')
const app = express()

// dotenv
require('dotenv').config()
process.env.SECRET

// handlebars
var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// express validator
const expressValidator = require('express-validator');
app.use(expressValidator());

// mongoose
const mongoose = require('mongoose');
require('./data/amigo-nerd-db')

// method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE or ?_method=PUT

// cookie parser
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
app.use(cookieParser())

// -----------------------------

// start
const port = 3001

app.listen(port, () => {
    console.log('listenign port:' + port)
})

// auth, home and control

var checkAuth = (req, res, next) => {
    console.log('checking auth')
    if(typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
        req.user = null
    }
    else {
        var token = req.cookies.nToken
        var decodedToken = jwt.decode(token, { complete: true }) || {}
        req.user = decodedToken.payload
    }
    next()
}
app.use(checkAuth)

app.get('/', (req, res) => {
    var currentUser = req.user

    res.render('home', { msg: 'hello world', currentUser });
})

require('./controllers/planos')(app)
require('./controllers/comments')(app)
require('./controllers/auth.js')(app)



module.exports = app