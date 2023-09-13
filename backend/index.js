// const firebase = require('firebase/app')
// const admin = require('firebase-admin');
// const serviceAccount = require('../signature-db486-firebase-adminsdk-7t93r-4cbb89bc8b.json')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const connectDB = require('./config/db')



const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// Connect to MongoDB
require('./routes/auth.route')(app);
require('./routes/user.route')(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan('dev'));



app.get("/", (req, res) => {
    res.send("Hello, world");
})


app.listen(3000, (err)=> {
    console.log("Express app started on port 3000")
})