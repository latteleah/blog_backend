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
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        console.log('Connected to MongoDB Atlas')
    } catch (error) {
        console.log(error)
    }
}


Login = require('./models/loginModel')
Blog = require('./models/blogModel')


var routes = require('./routes/blogRoutes')
routes(app)

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`User List API started on : ${port}`)
    })
    main()
})

async function main(){
    try{
        console.log("entering db")
        let exist = await Login.findOne({ username: 'leah', password: md5('admin'),role:"admin"})
        if(exist == null){
            console.log("need to add leah admin to login db")
            let user = new Login({username: 'leah', password: md5('admin'),role:"admin"})
            user.save()
        }
        let exist2 = await Login.findOne({ username: 'tom', password: md5('cat'),role:"regular"})
        if(exist2 == null){
            console.log("need to add tom cat to login db")
            let user = new Login({ username: 'tom', password: md5('cat'),role:"regular"})
            user.save()
        }
    }
    catch (err){
        console.log(err)
    }
}