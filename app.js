const express = require('express')
const PORT = process.env.PORT || 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// connect-flash
const session = require('express-session')
const flush = require('connect-flash')
const cookieParser = require('cookie-parser')

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

// cookie-parser , session, flush
app.use(cookieParser())

app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
  resave: true,
}))
app.use(flush())

// method-override
app.use(methodOverride('_method'))

// static files
app.use(express.static('public'))

// use routes
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})