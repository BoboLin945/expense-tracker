module.exports = {
  authenticator: (req, res, next) => {
    // true or false
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}