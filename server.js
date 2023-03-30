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


Login = require('./models/loginModel')
Blog = require('./models/blogModel')


var routes = require('./routes/blogRoutes')
routes(app)

app.listen(port)

console.log('User List API started on : '+ port)
main()
async function main(){
    try{
        let exist = await Login.findOne({ username: 'leah', password: md5('admin'),type:"admin"})
        if(exist == null){
            console.log("need to add bob 1234 to login db")
            let user = new Login({username: 'leah', password: md5('admin'),type:"admin"})
            user.save()
        }
        let exist2 = await Login.findOne({ username: 'tom', password: md5('cat'),type:"regular"})
        if(exist == null){
            let user = new Login({ username: 'tom', password: md5('cat'),type:"regular"})
            user.save()
        }
    }
    catch (err){
        console.log(err)
    }
}