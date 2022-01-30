const express = require('express')
const Project = require('../model/project')
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'dgsfagdaiushf#$@#ausdfh9123**$$$$#sd23r23#$as56d%dA%S6s5a6d'

const router = express.Router()

router.get('/', async(req, res) => {
    const allAvailableProjects = await Project.find({ status: 'active' })
    console.log(allAvailableProjects)
    res.render('projects.ejs', { allAvailableProjects })
})

router.get('/my', async(req, res) => {
    res.render('my-projects.ejs')
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
        await User.updateOne({ username: _username }, { $push: { projectsPlaced: response._id } })
        console.log('Project Created Successfully' + response);
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Dont try to attack me :)' })
    }
})

router.get('/:id', async(req, res) => {
    try {
        const project = await Project.findById(req.params['id']);
        if (project.status === 'deactive') {
            throw { err: 'its deactive' };
        }
        res.send(project)
    } catch (err) {
        console.log(err);
    }
})

router.put('/:id', async(req, res) => {
    try {
        const project = await Project.findById(req.params['id']);
        project.status = 'deactive';
        await project.save();
        console.log(project);
        res.send(project)
    } catch (err) {
        console.log(err.message);
        res.json({ "status": "project not found" })
    }
})


module.exports = router