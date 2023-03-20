'use strict'
module.exports = function(app){
    var userList = require('../controllers/userListController')
    var auth = require('../controllers/authController')
    app.route('/users')
        .get(auth.loggedIn,userList.listAllUsers)
        .post(auth.loggedIn,userList.createAUser)
    app.route('/users/:userId')
        .get(auth.loggedIn,userList.readAUser)
        .delete(auth.loggedIn,userList.deleteAUser)
        .post(auth.loggedIn,userList.updateAUser)
    app.route('/login')
        .post(auth.login)
}
