const request = require('request')
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')
const axios = require('axios')

const siteURL = 'http://test.btcc.com:8000'
const profileURL = siteURL + '/api/user'

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

OAuth2Strategy.prototype.userProfile = function (accessToken, done) {
  const opts = {
    url: profileURL,
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }
  request(opts, (err, resp, body) => {
    if (err) {
      return done(new InternalOAuthError('Failed to fetch user profile', error))
    }
    try {
      const json = JSON.parse(body)
      done(null, json)
    } catch (err) {
      done(err)
    }
  })
}

passport.use(new OAuth2Strategy({
    authorizationURL: 'http://test.btcc.com:8000/oauth/authorize',
    tokenURL: 'http://test.btcc.com:8000/oauth/token',
    clientID: 3,
    clientSecret: 'QcPukqXrlDqgOsiGfUmyOkFptGdmH8OPoXjkw1Eo',
    callbackURL: 'http://localhost:3000/oauth/callback',
    scope: 'place-orders user-information'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    return cb(null, profile)
  }
))

module.exports = passport
