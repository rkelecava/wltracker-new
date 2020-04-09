const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    description: String,
    serving: String,
    cals: Number
})

mongoose.model('Availableitem', Schema)
