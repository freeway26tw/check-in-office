const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')

require('fullcalendar')
require('@fullcalendar/core/locales-all')

const { getUser } = require('./helpers/auth-helpers')
const routes = require('./routes')
const env = require('./config/env')

const app = express()
const port = process.env.PORT || 3000

app.engine('.hbs', engine({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', '.hbs')
app.set('views', './views')

console.log(process.env.PORT)

app.use([
  express.urlencoded({ extended: true }),
  session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }),
  passport.initialize(),
  passport.session(),
  flash(),
  methodOverride('_method'),
  express.static(path.join(__dirname, 'public')),
  (req, res, next) => {
    res.locals.success_messages = req.flash('success_messages')
    res.locals.error_messages = req.flash('error_messages')
    res.locals.loginUser = getUser(req)
    next()
  },
  routes
])

app.listen(port, () => console.log(`Punch app listening on port ${port}!
Press CTRL + C to stop the process.`))