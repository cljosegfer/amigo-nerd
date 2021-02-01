const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()
const Plano = require('../models/planos')

const sample = {
    "title": "redes neurais artificiais",
    "description": "modelo mcp, perceptron e adaline, back propagation",
}

chai.use(chaiHttp)

// to solve update warning
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

describe('planos', () => {

    // index
    it ('should index all planos on / GET', (done) => {
        chai.request(server)
            .get('/planos/index')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    // new
    it('should display new form on /planos/new GET', (done) => {
        chai.request(server)
            .get('/planos/new')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    // show
    it('should show a single plano on /planos/<id> GET', (done) => {
        var plano = new Plano(sample)
        plano.save((err, data) => {
            chai.request(server)
                .get(`/planos/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.html
                    done()
                })
        })
    })

    // edit
    it('should edit a single plano on /planos/<id>/edit GET', (done) => {
        var plano = new Plano(sample)
        plano.save((err, data) => {
            chai.request(server)
                .get(`/planos/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.html
                    done()
                })
        })
    })

    // create
    it('should create a single plano on /planos/ POST', (done) => {
        chai.request(server)
            .post('/planos')
            .send(sample)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done()
            })
    })

    // update
    it('should update a single plano on /planos/<id> PUT', (done) => {
        var plano = new Plano(sample)
        plano.save((err, data) => {
            chai.request(server)
                .put(`/planos/${data._id}?_method=PUT`)
                .send({'title': 'redes neurais artificiais'})
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.html
                    done()
                })
        })
    })

    // delete
    it('should delete a single plano on /planos/<id> DELETE', (done) => {
        var plano = new Plano(sample)
        plano.save((err, data) => {
            chai.request(server)
                .delete(`/planos/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.html
                    done()
                })
        })
    })

    // clean sample
    after(function(){
        Plano.deleteMany(sample, function(err, planos){})
    })

})
