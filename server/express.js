const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const userRoutes = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')
const projectRoutes = require('./routes/project.route')
const taskRoutes = require('./routes/task.route')
const morgan = require('morgan')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use(morgan('short'))

app.use('/api/v1', require('./routes/index.route'))

module.exports =  app