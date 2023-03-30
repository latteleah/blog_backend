'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema


var CommentSchema = new Schema({
    text: String,
    author: String,
    date: { type: Date, default: Date.now }
});

// Updated to match the contact information in the assignment brief
var BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    headerImage: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [CommentSchema]
});
module.exports = mongoose.model('BlogPosts', BlogSchema)
