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
  failureRedirect: '/users/login',
  failureFlash: true
}))

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then(user => {
      // user 重複註冊
      if (user) {
        errors.push({ message: 'Email 已註冊過！' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      // 建立 User
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })

})

// log out
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出。')
  res.redirect('/users/login')
})

module.exports = router