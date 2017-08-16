exports.env = process.env.NODE_ENV || 'dev'

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next()
  }

  // denied. redirect to login
  res.redirect('/')
}
