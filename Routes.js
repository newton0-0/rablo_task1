require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const express = require('express');
const route = express.Router();

const tokenSchema = require('./models/tokenSchema')
const userSchema = require('./models/userSchema')

//routes
//get requests
route.get('/protected', async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.code);

        if (decoded) {
            res.status(200).json({ msg: 'Congratulations! You have access to the protected route' });
        }
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token', error: error.message });
    }
});

//post requests
route.post('/signup', async(req, res) => {
    const {email, username, oldpassword} = req.body
    const exists = await userSchema.findOne({email})
    if(exists) {
        return res.status(400).json({msg : "user already exists"})
    }
    try {
        const salt =await bcrypt.genSalt(10);
        const password = await bcrypt.hash(oldpassword, salt);
        const data = await userSchema.create({email, username, password})
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
});

route.post('/login', async(req, res) => {
    const {email, password} = req.body
    const userCheck = await userSchema.findOne({email: email})
    if(userCheck) {
        bcrypt.compare(password, userCheck.password)
            .then(() => {
                jwt.sign({email}, process.env.code, {expiresIn : "2h"}, async (err,token) => {
                    if(err) {
                        return res.status(400).json(err)
                    }
                    const loginInfo = await tokenSchema.create({email, token})
                    return res.status(200).json(loginInfo)
                })
            })
            .catch((err) => {
                res.status(400).json({msg : 'invalid password'})
            })
    }
    else{
        return res.status(404).json({msg : 'user not found'})
    }
})

module.exports = route