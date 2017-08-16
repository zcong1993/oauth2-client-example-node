exports.index = (req, res) => {
  res.end('hello world!')
}

exports.error = (req, res, next) => {
  const r = ~~req.params.num
  if (r !== 1) {
    return next(new Error('id !== 1'))
  }
  res.json({
    num: r
  })
}

exports.view = (req, res) => {
  const isLogin = req.isAuthenticated() || false
  res.render('index', { isLogin })
}
