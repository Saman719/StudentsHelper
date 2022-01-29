const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const usersRoutes = require('./routes/users-route.js')
const projectsRoutes = require('./routes/projects-route.js')

const app = express()


mongoose.connect('mongodb://localhost:27017/students-helper-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('connected to MongoDB')).catch((err) => { console.log(err) })

app.set('view-engine', 'ejs')
app.use(bodyParser.json())

//user routes
app.use('/user', usersRoutes)
    //project routes
app.use('/project', projectsRoutes)


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

module.exports = app.listen(3000, () => {
    console.log('Server up at 3000');
})