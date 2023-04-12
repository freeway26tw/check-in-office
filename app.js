const express = require('express')
const { engine } = require('express-handlebars') 
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000

const routes = require('./routes')

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs')
app.set('views', './views');
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(routes)
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => console.log(`Twitter app listening on port ${port}!
Press CTRL + C to stop the process.`))