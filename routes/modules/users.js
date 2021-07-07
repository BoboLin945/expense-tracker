const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// log in
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      // user 重複註冊
      if (user) {
        console.log('User exists!')
        return res.render('register', { name, email, password, confirmPassword })
      }
      if (password !== confirmPassword) {
        return console.log('passwords is not matched!')
      } else {
        // 建立 User
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      }
    })
})

// log out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
})

module.exports = router