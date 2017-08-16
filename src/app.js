const path = require('path')
const express = require('express')
const morgan = require('morgan')

const { env } = require('./utils')
const router = require('./router')
const passport = require('./passport')

const app = express()

app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'zcong', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

if (env !== 'test') {
  const loggerType = env === 'dev' ? 'dev' : 'combined'
  app.use(morgan(loggerType))
}

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(router)

// error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({
      err: err.message
    })
  } else {
    next()
  }
})

// not found handler
app.use((req, res) => {
  res.status(404)
  res.json({
    msg: '404 Not Found'
  })
})

module.exports = app
