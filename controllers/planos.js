const Plano = require('../models/planos')
const User = require('../models/users')

module.exports = function(app){
    
    // index
    app.get('/planos/index', (req, res) => {
        var currentUser = req.user

        Plano.find().lean().populate('author')
        .then(planos => {
            res.render('planos-index', { planos, currentUser })
        })
        .catch(err => {
            console.log(err)
        })
    })

    // new
    app.get('/planos', (req, res) => {
        var currentUser = req.user

        res.render('planos-new', { currentUser })
    })

    // create
    app.post('/planos', (req, res) => {
        if (req.user) {
            var plano = new Plano(req.body)
            plano.author = req.user._id
            plano
                .save()
                .then(plano => {
                    return User.findById(req.user._id)
                })
                .then(user => {
                    user.planos.unshift(plano)
                    user.save()
                    res.redirect(`/planos/${plano._id}`)
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
        else {
            return res.status(401)
        }
    })
    // app.post('/planos', (req, res) => {
    //     if (req.user) {
    //         Plano.create(req.body)
    //         .then((plano) => {
    //             console.log(plano)
    //             res.redirect(`/planos/${plano._id}`)
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    //     }
    //     else {
    //         return res.status(401)
    //     }
    // })

    // show
    app.get('/planos/:id', (req, res) => {
        var currentUser = req.user

        Plano.findById(req.params.id).lean()
        .populate({path:'comments', populate: {path: 'author'}}).populate('author')
        .then((plano) => {
            res.render('planos-show', { plano, currentUser })
        })
        .catch((err) => {
            console.log(err.message)
        })
    })

    // edit
    app.get('/planos/:id/edit', (req, res) => {
        var currentUser = req.user

        Plano.findById(req.params.id, function(err, plano) {
            res.render('planos-edit', { plano, currentUser })
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
