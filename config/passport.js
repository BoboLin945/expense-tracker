const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化
  app.use(passport.initialize());
  app.use(passport.session());
  // 登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('login_msg', 'Email is not registered!'))
        }
        return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash('login_msg', 'Incorrect password.'))
          }
          return done(null, user)
        })      
      })
      .catch(err => console.log(err))
  }))

  // 序列與反序列
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch(err => console.log(err) )
  })
}