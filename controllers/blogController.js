'use strict'
var mongoose = require('mongoose')
Blog = mongoose.model('BlogPosts')
const _ = require('lodash');

exports.viewPosts = async function(req, res){
    if (req.decoded && req.decoded.user) {
        var query = {sort: {date: -1}}
        try {
            let posts = await Blog.find({}, null, query)
            res.json(posts)
        }
        catch(err){
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while getting posts',
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

exports.viewBlogPost = async function(req, res){
    if (req.decoded && req.decoded.user) {
        //console.log(req.params.userId)
        try{
            let post = await Blog.find({title :req.params.title}).lean()
            res.json(post)

        }
        catch(err){
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while finding post',
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


exports.newPost = async function(req, res){
    if (req.decoded && req.decoded.user) {
        console.log(req.body)
        try{
            let newPost = new Blog(req.body)
            await newPost.save().then(
                res.json(newPost)
            )
        }
        catch(err){
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while making post',
                error : err,
                post : newPost
            });
        }
    }
    else{
        res.status(401).json({
            message : 'Failed to Authenticate.'
        })
    }
}

exports.makeComment = async function(req, res) {
    if (req.decoded && req.decoded.user) {
        try {
            let blogPost = await Blog.findOne({ title: req.params.title });
            blogPost.comments.push({
                text: req.body.text,
                author: req.body.author
            });
            await blogPost.save();
            res.json(blogPost);
        } catch (err) {
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while adding comment',
                error: err
            });
        }
    } else {
        res.status(401).json({
            message: 'Failed to Authenticate.'
        });
    }
}

exports.deletePost = async function(req, res){
    if (req.decoded && req.decoded.user) {
        try{
            let user = await Blog.findOneAndRemove({title :req.params.title}).exec().then(
                res.json({message: "Delete blog post: " + req.params.title + " successfully"})
            )
        }
        catch(err){
            console.log('Error:', err);
            return res.status(500).json({
                message: 'error while deleting post',
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

exports.editPost = async function(req, res){
    if (req.decoded && req.decoded.user) {
        try{
            let editedPost = _.omit(req.body, '_id')
            let post = await Blog.findOneAndUpdate({title :req.params.title}, editedPost).lean().exec()
            res.json(post)
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                message: 'error while updating user',
                error : err,
                post : editedPost
            });
        }
    }
    else{
        res.status(401).json({
            message : 'Failed to Authenticate.'
        })
    }
}
