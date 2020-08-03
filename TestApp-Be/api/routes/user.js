const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const Friend = require('../models/friends')
const mongoose = require('mongoose');
var check_auth = require('../middleware/check-auth');
const connectionURL = 'mongodb://localhost:27017/testPortalDb';
mongoose.connect(connectionURL, { useNewUrlParser: true })

//api for update profile
router.post('/personal/:id', check_auth, (req, res) => {
    let userData = req.userData;
    if (!userData) {
        res.sendStatus(403)
    } else {
        User.findById(req.params.id)
            .exec((err, user) => {
                if (err) {
                    res.send("error in update")
                }
                else {
                    user.name = req.body.name,
                        user.gender = req.body.gender
                    user.save((err, updateUser) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        }
                        else {
                            return res.json(updateUser)
                        }
                    })
                }
            })
    }
})

//api for get all users
router.get('/users', check_auth, (req, res) => {
    let userData = req.userData;
    if (!userData) {
        res.sendStatus(403)
    } else {
        User.find({}).exec((err, result) => {
            if (err) {
                console.log("error on getting all users", err)
            }
            else {
                res.send(result),
                    userData
            }
        })
    }

})

//api for get my profile
router.get('/profile/:id', check_auth, (req, res) => {
    let userData = req.userData;
    if (!userData) {
        console.log('ERROR: Could not connect to the protected route');
        return res.sendStatus(403)
    } else {
        console.log("params", req.params.id)
        User.findById(req.params.id)
            .exec((err, result) => {
                if (err) {
                    return res.send("error inside profile")
                }
                else {
                    return res.json({
                        result: result,
                        userData
                    })
                }
            })
    }
})

//api for send request
router.post('/follow/:id', check_auth, (req, res) => {
    let userData = req.userData;
    if (!userData) {
        console.log('ERROR: Could not connect to the protected route');
        return res.sendStatus(403)
    } else {
        User.findById(req.params.id)
            .exec((err, user) => {
                if (err) { console.log("error while connect to friend") }
                else {
                    user.friends.push(req.body.friend_id)
                    user.save((err, doc) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        }
                        else {
                            return res.json(doc)
                        }
                    })
                }
            })
    }
})




module.exports = router;