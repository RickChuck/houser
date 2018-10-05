require('dotenv').config()
const express = require("express");
const massive = require("massive");
const bodyParser = require('body-parser')
const session = require('express-session')

const propertyCtrl = require('./controllers/propertyCtrl')

const app = express()
app.use(bodyParser.json())



let { CONNECTION_STRING, PORT } = process.env

app.get('/api/properties', propertyCtrl.getProperties)
app.delete('/api/properties/:id', propertyCtrl.deleteProperty)

async function startServer() {
  try {
    const db = await massive(CONNECTION_STRING)
    app.set('db', db)
    console.log('Connected to Massive')
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
  } catch (err) {
    console.error('startServer function failed in server.js:', err)
  }
}

startServer()