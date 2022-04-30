const express = require('express')
const app = express.Router()

app.get('/', async (req, res) => {
  res.send("Hello world, this is AIA assesment API");
})

module.exports = app



