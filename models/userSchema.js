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
    },
    personalDetails: {
        firstName: {
            type: String
        },
        dob: {
            type: Date
        },
        gender: {
            type: String
        },
        guardianContact: {
            type: Number
        }
    },
    addressDetails: {
        address: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        pincode: {
            type: Number
        },
        referral: {
            type: Number
        }
    },
    academicDetails: {
        school: {
            type: String
        },
        standard: {
            type: Number
        },
        board: {
            type: String
        },
        subjects: {
            type: [String]
        }
    }
}, {timestamps: true})

const userSchema = mongoose.model('user', user)
module.exports = userSchema