const request = require('request')
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')

const siteURL = process.env.BASEURL
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
    authorizationURL: `${siteURL}/oauth/authorize`,
    tokenURL: `${siteURL}/oauth/token`,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: 'http://localhost:3000/oauth/callback',
    scope: 'place-orders user-information need-jwt'
  },
  function(accessToken, refreshToken, profile, cb) {
    // your logic here
    console.log(profile)
    return cb(null, profile)
  }
))

module.exports = passport
