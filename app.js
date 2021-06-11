const express = require('express')
const PORT = 3000
const exphbs = require('express-handlebars')

// routes setting
const routes = require('./routes')

// mongoose setting
require('./config/mongoose')

const app = express()

// view - handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body-parser
app.use(express.urlencoded({ extended: true }))

// use routes
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})