if (!process.env.TRACKER_SECRET) {
    const env = require('../env')
}

// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express() // create your express app
const Routes = require('./routes')
const Models = require('./models')
const config = require('./config')

Models.load()

// Mongoose database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.db, config.mongo.options, (err) => {
    if (err) { 
        console.log(err)
        process.exit()
    }
})
mongoose.set('useCreateIndex', true)

// make app use dependencies
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

Routes.load(app)

app.listen(process.env.PORT || config.port, () => {
    console.log('Server is running on ' + (process.env.PORT || config.port))
}) // client is already running on 8080