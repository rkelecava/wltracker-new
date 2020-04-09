const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    type: String,
    qty: Number,
    unitOfMeasure: String
})

mongoose.model('Dailyfluid', Schema)
