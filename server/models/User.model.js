const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

var Userschema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true },
    availableitems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Availableitem' }],
    dailystats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dailystat' }],
    dailyfoods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dailyfood' }],
    dailyfluids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dailyfluid' }],
    hash: String,
    salt: String,
    lastLogin: Date,
    created: { type: Date, default: Date.now }
})

Userschema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(64).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex')
}

Userschema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex')

    return this.hash === hash
}

Userschema.methods.generateJWT = function () {
    var today = new Date()
    var exp = new Date(today)
    exp.setDate(today.getDate() + 30)

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    }, process.env.TRACKER_SECRET)
}

mongoose.model('User', Userschema)