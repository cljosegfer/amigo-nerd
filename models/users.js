const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")

const User = new Schema({
    username: { type: String, required: true },
    password: { type: String, select: false },
    planos : [{ type: Schema.Types.ObjectId, ref: "Plano" }]
})

User.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash
            next()
        })
    })
})

User.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch)
    })
}

module.exports = mongoose.model("User", User)