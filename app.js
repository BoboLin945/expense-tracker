const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const usePassport = require('./config/passport')

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
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

// method-override
app.use(methodOverride('_method'))

// static files
app.use(express.static('public'))

// passport
usePassport(app)

// connect-flash
app.use(flash())

// middleware setting res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.login_msg = req.flash('login_msg')
  next()
})

// use routes
app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`)
})