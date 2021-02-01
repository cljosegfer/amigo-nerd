const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Plano = mongoose.model('Plano', {
    title: String,
    description: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

module.exports = Plano
