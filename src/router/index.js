const { Router } = require('express')

const controllers = require('../controller')
const passport = require('../passport')
const { ensureAuthenticated } = require('../utils')

const router = new Router()

router.get('/', controllers.view)
router.get('/err/:num', controllers.error)
router.get('/auth/btcc', passport.authenticate('oauth2'))
router.get('/oauth/callback',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/secret')
    }
)
router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {
  req.logout()
  return res.redirect('/')
})

router.get('/secret', ensureAuthenticated, (req, res) => {
  res.render('secret', {
    user: req.user
  })
})

module.exports = router
