const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  // 初始化
  app.use(passport.initialize());
  app.use(passport.session());
  // 登入策略
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Email is not registered!' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  // 序列與反序列
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch(err => done(err, null) )
  })
}