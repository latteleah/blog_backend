'use strict'
var mongoose = require('mongoose')
User = mongoose.model('Users')
Login = mongoose.model('Login')
var md5 = require('md5')
var jwt = require('jsonwebtoken')


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

