const Plano = require('../models/planos')

module.exports = function(app){
    
    // index
    app.get('/planos/index', (req, res) => {
        Plano.find().lean()
        .then(planos => {
            res.render('planos-index', {planos: planos})
        })
        .catch(err => {
            console.log(err)
        })
    })

    // new
    app.get('/planos/new', (req, res) => {
        res.render('planos-new', {})
    })

    // create
    app.post('/planos', (req, res) => {
        Plano.create(req.body)
        .then((plano) => {
            console.log(plano)
            res.redirect(`/planos/${plano._id}`)
        })
        .catch((err) => {
            console.log(err.message)
        })
    })

    // show
    app.get('/planos/:id', (req, res) => {
        Plano.findById(req.params.id).lean()
        .populate('comments')
        .then((plano) => {
            res.render('planos-show', { plano: plano })
        })
        .catch((err) => {
            console.log(err.message)
        })
    })

    // edit
    app.get('/planos/:id/edit', (req, res) => {
        Plano.findById(req.params.id, function(err, plano) {
            res.render('planos-edit', {plano: plano})
        }).lean()
    })

    // update
    app.put('/planos/:id', (req, res) => {
        Plano.findByIdAndUpdate(req.params.id, req.body).lean()
        .then(plano => {
            res.redirect(`/planos/${plano._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
    })

    // delete
    app.delete('/planos/:id', function (req, res) {
        console.log("delete plano")
        Plano.findByIdAndRemove(req.params.id).lean()
        .then((plano) => {
            res.redirect('/planos/index')
        })
        .catch((err) => {
            console.log(err.message)
        })
    })
}
