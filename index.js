// express
const express = require('express')
const app = express()

// handlebars
var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// start
const port = 3001

app.listen(port, () => {
    console.log('listenign port:' + port)
})

// routes
app.get('/', (req, res) => {
    res.render('home')
})