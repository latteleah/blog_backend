'use strict'
var mongoose = require('mongoose')
Login = mongoose.model('Login')
var md5 = require('md5')
var jwt = require('jsonwebtoken')

exports.signup = async function(req,res){
    const { username, password } = req.body
    try {
        var user = await Login.find({username: username, password: md5(password)})
        if (!user) {
            let newUser = new Login({username: username, password: md5(password), type: "regular"})
            await newUser.save().then(
                setTimeout(function () {
                    console.log("Executed after 1 second");
                }, 1000)
            )
            res.json(newUser)
        } else {
            return res.status(409).json({
                message: 'user already exists',
                user : newUser
            });
        }
    }
    catch(err){
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while creating new user login',
                error : err,
                user : newUser
            });
        }
}
// Test user and password is pass, pass1
exports.login = async function(req, res){
    const { username, password } = req.body
    console.log('username:', username)
    console.log('password:', password)
    // Query login model for username/password matching our user input.
    try{
        var user = await Login.findOne({ username: username, password: md5(password)})
        if(!user){
            return res.status(401).json({
                message: 'Failed to login - incorrect username/password.',
                user: { username, password }
            });
        }
        // if found then return a token, secret key should be an env variable
        return res.json({
            token: jwt.sign({ user: username }, process.env.secret_key,'','')
        });
    }
    catch(err){
        console.log('Error:', err);
        return res.status(500).json({
            message: 'error while logging in',
            error : err,
            user: { username, password }
        });
    }
}

exports.loggedIn = function(req, res, next) {
    const userHeader = req.headers["authorization"];
    if (typeof userHeader !== 'undefined') {
        const header = userHeader.split(" ");
        req.token = header[1];
        jwt.verify(req.token, process.env.secret_key, function(err, decoded) {
            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token.' });
            } else {
                const currentTime = Math.floor(Date.now() / 1000)
                const timeIssued = decoded.iat
                const timeSinceIssued = currentTime-timeIssued
                if(timeSinceIssued > 3600){ //over an hour since issued
                    return res.status(401).json({ message: 'Token expired.' });
                }
                else {
                    req.decoded = decoded;
                    console.log(decoded)
                    next();
                }
            }
        });
    } else {
        return res.status(401).json({ message: 'No token.' });
    }
}

exports.isAdmin = async function (req,res,next){
    const {username} = req.body
    try {
        var user = await Login.findOne({username: username, type:"admin"})
        if(user){
            next();
        }
    }
    catch{
        return res.status(403).json({ message: 'Not admin.' });
    }
}

