const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    type: String,
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Availableitem' },
    qty: Number
})

mongoose.model('Dailyfood', Schema)
