const mongoose = require('mongoose')

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const userSchema = mongoose.model('user', user)
module.exports = userSchema