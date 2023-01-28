const express = require('express')
const router = require('./router/router')
const path = require('path')

const notFound = require('./controlers/notfound')

const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  req.accepts(['json', 'html', 'text/plain', 'application/json'])
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(express.static('public/html/'))
app.use('/', router)

app.use(notFound)

try {
  app.listen(port, () => {
    console.log('Server działa :) ', ` http://127.0.0.1:${port}`)
  })
} catch (error) {}
