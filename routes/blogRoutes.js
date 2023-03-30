'use strict'
const auth = require("../controllers/authController");
const blog = require("../controllers/blogController");
module.exports = function(app){
    var userList = require('../controllers/userListController')
    var blog = require('../controllers/blogController')
    var auth = require('../controllers/authController')
    app.route('/admin')
        .get(auth.loggedIn, auth.isAdmin, blog.viewPosts)
        .post(auth.loggedIn,blog.newPost)
    app.route('/blog')
        .get(blog.viewPosts)
    app.route('/blog/:blogtitle')
        .get(blog.viewBlogPost)
        .post(auth.loggedIn(), blog.makeComment)
    app.route('/admin/blog/:blogtitle')
        .get(auth.loggedIn, auth.isAdmin,blog.viewBlogPost)
        .delete(auth.loggedIn, auth.isAdmin, blog.deletePost)
        .post(auth.loggedIn, auth.isAdmin,blog.editPost)
    app.route('/login')
        .post(auth.login)
    app.route('/signup')
        .post(auth.signup())
}
