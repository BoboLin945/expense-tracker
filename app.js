const express = require('express')
const PORT = 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// Require handlebars and just-handlebars-helpers
const Handlebars = require('handlebars')
const H = require('just-handlebars-helpers')

// routes setting
const routes = require('./routes')

// Register just-handlebars-helpers with handlebars
H.registerHelpers(Handlebars)

// mongoose setting
require('./config/mongoose')

const app = express()

// view - handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body-parser
app.use(express.urlencoded({ extended: true }))

// method-override
app.use(methodOverride('_method'))

// static files
app.use(express.static('public'))

// use routes
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})