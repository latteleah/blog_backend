'use strict'
var mongoose = require('mongoose')
User = mongoose.model('Users')
const _ = require('lodash');


exports.listAllUsers = async function(req, res){
    if (req.decoded && req.decoded.user) {
        var query = {sort: {firstName: 1}}
        try {
            let users = await User.find({}, null, query)
            res.json(users)
        }
        catch(err){
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while listing users',
                error : err
            });
        }
    }
    else{
        res.status(401).json({
            message : 'Failed to Authenticate.'
        })
    }
}

exports.createAUser = async function(req, res){
    if (req.decoded && req.decoded.user) {
        console.log("success entering API")
        console.log(req.body)
        try{
            let newUser = new User(req.body)
            console.log("defined new user")
            await newUser.save().then(
                res.json(newUser)
            )
        }
        catch(err){
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while creating users',
                error : err,
                user : newUser
            });
        }
    }
    else{
        res.status(401).json({
            message : 'Failed to Authenticate.'
        })
    }
}

exports.readAUser = async function(req, res){
    if (req.decoded && req.decoded.user) {
        //console.log(req.params.userId)
        try{
            console.log("read a user")
            console.log(req.params.userId)
            let user = await User.find({contactID :req.params.userId}).lean()
            //console.log(user),
            res.json(user)

        }
        catch(err){
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while reading user',
                error : err
            });
        }
    }
    else{
        res.status(401).json({
            message : 'Failed to Authenticate.'
        })
    }
}

exports.deleteAUser = async function(req, res){
    if (req.decoded && req.decoded.user) {
        try{
            let user = await User.findOneAndRemove({contactID :req.params.userId}).exec().then(
                res.json(response)
            )
            const response = {
                message: "Delete user id: " + req.params.userId + " successfully",
            }
        }
        catch(err){
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while deleting user',
                error : err
            });
        }
    }
    else{
        res.status(401).json({
            message : 'Failed to Authenticate.'
        })
    }
}

exports.updateAUser = async function(req, res){
    if (req.decoded && req.decoded.user) {
        try{
            console.log("update a user")
            console.log(req.params.userId)
            var newUser = req.body
            console.log("newUser "+JSON.stringify(newUser))
            let userUpdated = _.omit(req.body, '_id')
            console.log("user updated " + JSON.stringify(userUpdated))
            let user = await User.findOneAndUpdate({contactID :req.params.userId}, userUpdated).lean().exec().then(
                res.json(user)
            )
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                message: 'error while updating user',
                error : err,
                user : newUser
            });
        }
    }
    else{
        res.status(401).json({
            message : 'Failed to Authenticate.'
        })
    }
}