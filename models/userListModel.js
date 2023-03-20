'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Updated to match the contact information in the assignment brief
var UserSchema = new Schema({
    contactID: {
        type: String,
        validate: /^[0-9-+\s]+$/,
        Required: 'Please enter numeric string',
        Unique: true
    },
    firstName: {
        type: String,
        Required: 'Please enter'
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        Required: 'Please enter'
    },
    gender: {
        type: String,
        enum: ['F','M']
    },
    email: {
        type: String,
    },
    mobile:{
        type: String,
        validate: /^[0-9-+\s]+$/
    }
})

module.exports = mongoose.model('Users', UserSchema)
