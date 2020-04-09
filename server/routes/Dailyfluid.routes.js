const express = require('express')
const mongoose = require('mongoose')
const jwt = require('express-jwt')
const Dailyfluid = mongoose.model('Dailyfluid')
const User = mongoose.model('User')
const router = express.Router()

var auth = jwt({
	secret: process.env.TRACKER_SECRET,
	userProperty: 'payload'
});

// Add auth to all these routes

router.post('/add/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) { return res.status(400).json(err) }
        if (!user) { return res.status(400).json({ message: 'A user matching the provided ID was not found' }) }
        var dailyfluid = new Dailyfluid(req.body)
        dailyfluid.save((err, f) => {
            if (err) { return res.status(400).json(err) }
            user.dailyfluids.push(f._id)
            user.save((err, u) => {
                if (err) { return res.status(400).json(err) }
                res.json(u)
            })
        })
    })
})

router.get('/bydate/:id', (req, res) => {
    var date = new Date(req.body.date)
    User.findById(req.params.id).populate('dailyfluids').exec((err, user) => {
        if (err) { return res.status(400).json(err) }
        if (!user) { return res.status(400).json({ message: 'A user matching the provided ID was not found' }) }
        var subset = []
        user.dailyfluids.forEach((f) => {
            if ((f.timestamp.getMonth() === date.getMonth()) && (f.timestamp.getDate() === date.getDate()) && (f.timestamp.getFullYear() === date.getFullYear())) {
                subset.push(f)
            }
        }, this)
        res.json(subset)
    })
})

module.exports = router