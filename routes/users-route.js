const express = require('express')
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'dgsfagdaiushf#$@#ausdfh9123**$$$$#sd23r23#$as56d%dA%S6s5a6d'

const router = express.Router()

router.post('/change-password', async(req, res) => {
    const { token, newpassword } = req.body
    try {
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id
        const hashedPassword = await bcrypt.hash(newpassword, 10)
        await User.updateOne({ _id }, {
            $set: {
                password: hashedPassword
            }
        })
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Dont try to attack me :)' })
    }
})

router.post('/login', async(req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username }).lean();

    if (!user) {
        return res.json({ status: 'user not found' })
    }

    if (await bcrypt.compare(password, user.password)) {
        //user pass is OK
        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, JWT_SECRET)

        return res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', data: 'Invalid username/password' })


})


//register

router.get('/register', (req, res) => {
    res.render('register.ejs')
})
router.post('/register', async(req, res) => {
    const { name, familyName, username, password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
        const response = await User.create({
            name,
            familyName,
            username,
            password
        })
        console.log('User Created Successfully' + response);
        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 'error' })
    }
})

module.exports = router