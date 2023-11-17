const mongoose = require('mongoose')

const token = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token : {
        type: String,
        required: true
    }
}, {timestamps: true})

const tokenSchema = mongoose.model('token', token)
module.exports = tokenSchema