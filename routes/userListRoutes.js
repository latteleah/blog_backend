'use strict'
module.exports = function(app){
    var contactList = require('../controllers/contactController')
    var auth = require('../controllers/authController')
    app.route('/users')
        .get(auth.loggedIn,contactList.listAllUsers)
        .post(auth.loggedIn,contactList.createAUser)
    app.route('/users/:userId')
        .get(auth.loggedIn,contactList.readAUser)
        .delete(auth.loggedIn,contactList.deleteAUser)
        .post(auth.loggedIn,contactList.updateAUser)
    app.route('/login')
        .post(auth.login)
}
