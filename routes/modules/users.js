const express = require('express')
const router = express.Router()

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// log in
router.post('/login', (req, res) => {

})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router