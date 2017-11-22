const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')
const routes = require('./src/routes/routes')

const passport = require('passport')
const localStrategy = require('./src/auth/local_strategy')

const app = express()

const MONGO_URL = 'mongodb://localhost:27017/conhecimento-livre-dev'

app.set('MONGO_URL', (process.env.MONGO_URL || MONGO_URL))

mongoose.connect(app.get('MONGO_URL'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())
app.use(passport.session())
passport.use(localStrategy)

app.post('/admin/list',
  passport.authenticate('local', { failureRedirect: '/admin' }),
  routes.list
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.set('port', (process.env.PORT || 3000))

app.use(express.static(path.join(`${__dirname}/public`)))

app.get('/', routes.index)

app.get('/admin', routes.admin)

<<<<<<< 745f846f940914d8ec8e9d8287f100256a93973f
=======
app.get('/admin/list', routes.list)

app.get('/admin/newAuthor', routes.newAuthor)

app.post('/admin/newAuthor', routes.insert)

>>>>>>> <@AndreiRupertti, @JessicaFranke> adiciona rota para novo autor
app.get('/content/:id', routes.content)

app.get('/course/:id', routes.course)

app.get('/author/:id', routes.author)

app.post('/deleteCourse', (req, res) => {
  console.log("olaaaaa");
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(app.get('port'), () =>
  console.log(`Node app is running on port ${app.get('port')}`))
