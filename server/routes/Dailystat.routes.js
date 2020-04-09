const express = require('express')
const mongoose = require('mongoose')
const jwt = require('express-jwt')
const Dailystat = mongoose.model('Dailystat')
const User = mongoose.model('User')
const router = express.Router()

var auth = jwt({
	secret: process.env.TRACKER_SECRET,
	userProperty: 'payload'
});

router.post('/add/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) { return res.status(400).json(err) }
        if (!user) { return res.status(400).json({ message: 'A user matching the provided ID was not found' }) }
        var dailystat = new Dailystat(req.body)
        dailystat.save((err, d) => {
            if (err) { return res.status(400).json(err) }
            user.dailystats.push(d._id)
            user.save((err, u) => {
                if (err) { return res.status(400).json(err) }
                res.json(u)
            })
        })
    })
})

module.exports = router