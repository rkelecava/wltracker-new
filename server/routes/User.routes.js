const express = require('express')
const mongoose = require('mongoose')
User = mongoose.model('User')
router = express.Router()

router.get('/', (req, res) => {  // This route should go away after done testing
  User.find().populate('availableitems dailystats dailyfluids').populate({ path: 'dailyfoods', populate: { path: 'item' }}).exec((err, users) => {
    if (err) {
      console.log(err)
      res.send([])
      return
    }
    res.send(users)
  })
})

router.post('/signin', (req, res, next) => {
  if (!req.body.username || req.body.username === '') {
    return res.status(400).json({
      message: 'Username is a required field'
    })
  }

  if (!req.body.password || req.body.password === '') {
    return res.status(400).json({
      message: 'Password is a required field'
    })
  }

  User.findOne({
    username: req.body.username.trim()
  }, (err, user) => {
    if (err) { return res.status(401).json(err) }
    if (!user) { return res.status(401).json({ message: 'Invalid username' }) }
    if (!user.validPassword(req.body.password.trim())) { return res.status(401).json({ message: 'Invalid password' }) }
    res.json({ token: user.generateJWT() })
  })

})

router.post('/register', (req, res) => {
  if (!req.body.username || req.body.username === '') {
    return res.status(400).json({
      message: 'Username is a required field'
    })
  }
  
  if (!req.body.password || req.body.password.length < 7) {
    return res.status(400).json({
      message: 'Password is a required field and must be a minimum of 7 characters long'
    })
  }

  var user = new User()
  user.username = req.body.username
  user.setPassword(req.body.password)
  user.save((err) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          message: 'This username is already registered'
        })
      }

      return res.status(400).json({
        message: err.errmsg
      })
    }

    return res.json({ token: user.generateJWT() })
  })
})


module.exports = router