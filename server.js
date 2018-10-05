require('dotenv').config()
const express = require("express");
const massive = require("massive");
const bodyParser = require('body-parser')
const session = require('express-session')

const authCtrl = require('./controllers/authCtrl')
const propertyCtrl = require('./controllers/propertyCtrl')

const app = express()
app.use(bodyParser.json())



let { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env
app.use(session({
  secret: SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
}))

app.post('/api/auth/register', authCtrl.registerAccount)
app.post('/api/auth/login', authCtrl.accountLogin)
app.post('/api/auth/logout', (req, res, next) => {
  req.session.destroy()
  res.sendStatus(200)
})

app.get('/api/properties', propertyCtrl.getProperties)
app.delete('/api/properties/:id', propertyCtrl.deleteProperty)

async function startServer() {
  try {
    const db = await massive(CONNECTION_STRING)
    app.set('db', db)
    console.log('Connected to Massive')
    app.listen(SERVER_PORT, () => console.log(`Server is listening on port: ${SERVER_PORT}`))
  } catch (err) {
    console.error('startServer function failed in server.js:', err)
  }
}

startServer()