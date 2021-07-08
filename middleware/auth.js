module.exports = {
  authenticator: (req, res, next) => {
    // true or false
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Please Login!')
    res.redirect('/users/login')
  }
}