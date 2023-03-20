const cors = require('cors');
var express = require('express')
require('dotenv').config();
app = express()
app.use(cors())
var md5 = require('md5')


// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

port = process.env.PORT || 3000

mongoose = require('mongoose')
mongoose.set('strictQuery', true);

/*bodyParser = require('body-parser')*/

mongoose.Promise = global.Promise
mongoose
    .connect(process.env.MONGO_URI)
    .catch (error => console.log(error));

User = require('./models/userListModel')
Login = require('./models/loginModel')

var routes = require('./routes/userListRoutes')
routes(app)

app.listen(port)

console.log('User List API started on : '+ port)
main()
async function main(){
    try{
        let exist = await Login.findOne({ username: 'bob', password: md5('1234')})
        if(exist == null){
            console.log("need to add bob 1234 to login db")
            let user = new Login({ username: 'bob', password: md5('1234')})
            user.save()
        }
    }
    catch (err){
        console.log(err)
    }
}