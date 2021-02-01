const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = (app) => {

    //sign up
    app.get('/sign-up', (req, res) => {
        res.render('sign-up')
    })

    // new user
    app.post('/sign-up/new', (req, res) => {
        const user = new User(req.body)
        user
            .save()
            .then(user => {
                var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" })
                // res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
                res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
                res.redirect('/')
            })
            .catch(err => {
                console.log(err.message)
                return res.status(400).send({ err: err })
            })
    })

    // logout
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken')
        res.redirect('/')
    })

    // login
    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.post('/login', (req, res) => {
        const username = req.body.username
        const password = req.body.password

        User.findOne({ username }, 'username password')
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        message: 'wrong username or password'
                    })
                }
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send({
                            message: 'wrong username or password'
                        })
                    }
                    const token = jwt.sign({ _id: user._id, username: user.username }, 
                        process.env.SECRET, {
                            expiresIn: "60 days"
                        })
                    res.cookie("nToken", token, { maxAge: 900000, httpOnly: true })
                    res.redirect("/")
                })
            })
            .catch(err => {
                console.log(err)
            })
    })

}