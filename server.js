const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const allowedUrls = ['about', 'home', '/']
const port = process.env.PORT || 3000;

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req, res, next)  => {
  var now = new Date().toString()
  var logMsg = `${now} - ${req.method} ${req.url}`
  console.log(logMsg)
  fs.appendFile('server.log', logMsg + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log')
    }
  })
  next()
})

app.use((req, res, next)  => {
  if ((req.method === 'GET') && ((req.url==='/home') || (req.url==='/about')|| (req.url==='/')|| (req.url==='/projects')))
  {
    next()
  }
  res.render('maintenance.hbs' , {
  })
})

hbs.registerHelper('getCurYear', () =>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  // res.send('<h1>hello Express</h1>')
  res.render('home.hbs' , {
    pageTitle: 'Home Page',
    welcomeMessage: "Welcome to my website",
    likes: ['Nothing', 'cooking']
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: `Unable to handle request`
  })
})

app.listen(port, () =>{
  console.log('Server is up on port 3000')
})
