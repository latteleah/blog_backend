'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var LoginSchema = new Schema({
    username: {
        type: String,
        Required: 'Please enter'
    },
    password: {
        type: String,
        Required: 'Please enter'
    },
    role:{
        type: String,
        enum: ['admin','regular']
    }
})

module.exports = mongoose.model('Login', LoginSchema)