// express
const express = require('express')
const app = express()

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

// -----------------------------

// start
const port = 3001

app.listen(port, () => {
    console.log('listenign port:' + port)
})

// home and control

app.get('/', (req, res) => {
    res.render('home', { msg: 'hello world' });
})

require('./controllers/planos')(app)
require('./controllers/comments')(app)

module.exports = app