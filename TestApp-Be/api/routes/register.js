const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const connectionURL = 'mongodb://localhost:27017/testPortalDb';
const bcrypt = require('bcrypt');
mongoose.connect(connectionURL, { useNewUrlParser: true })

//signup api
router.post('/register', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'mail exists'
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return req.status(500).json({
                            error: err
                        })
                    }
                    else {
                        var newUser = new User()
                        newUser.name = req.body.name
                        newUser.email = req.body.email
                        newUser.gender = req.body.gender
                        newUser.password = hash
                       
                        newUser.save((err, user) => {
                            console.log("user backend", user)
                            if (err) {
                                console.log("error in inserting user")
                            }
                            else {
                                res.json(user)
                            }
                        })
                    }
                })
            }
        })
        .catch()
})

//login api
router.post('/login', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Mail not found"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "auth failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        user_id: user[0]._id
                    },
                        'abc'
                    );
                    return res.status(200).json({
                        message: "auth successfull",
                        token: token,
                        user_id: user[0]._id
                    })
                }
                else {
                    res.status(401).json({
                        message: 'invalid password'
                    })
                }

            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router;