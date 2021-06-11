const express = require('express')
const PORT = 3000
const exphbs = require('express-handlebars')

// mongoose setting
require('./config/mongoose')

const app = express()


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})