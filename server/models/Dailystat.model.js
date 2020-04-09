const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    weight: Number,
    unitOfMeasure: String
})

mongoose.model('Dailystat', Schema)
