const express = require('express')
const Project = require('../model/project')
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'dgsfagdaiushf#$@#ausdfh9123**$$$$#sd23r23#$as56d%dA%S6s5a6d'

const router = express.Router()

router.get('/', async(req, res) => {
    const allAvailableProjects = await Project.find({ status: 'active' })
    console.log(allAvailableProjects.length)
    res.render('projects.ejs', { allAvailableProjects })
})

router.get('/all', async(req, res) => {
    const allAvailableProjects = await Project.find({ status: 'active' })
    res.send(allAvailableProjects);
})

router.get('/create', (req, res) => {
    res.render('create-Project.ejs')
})

router.post('/create', async(req, res) => {
    const { courseName, fieldOfStudy, description, price, token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET)
        const _username = user.username
        const foundUser = User.findOne({ username: _username })
        const response = await Project.create({
            courseName,
            fieldOfStudy,
            description,
            price: Number(price),
            creator: (await foundUser)._id
        })
        await User.updateOne({ username: _username }, { $push: { projects_placed: response._id } })
        console.log('Project Created Successfully' + response);
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Dont try to attack me :)' })
    }
})


module.exports = router