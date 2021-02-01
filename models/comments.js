const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
    content: String,
    reviewId: { type: Schema.Types.ObjectId, ref: 'Plano' },
    author: { type: Schema.Types.ObjectId, ref : 'User', required: true }
})

module.exports = Comment
