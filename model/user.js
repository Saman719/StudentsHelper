const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    familyName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projects_placed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectSchema' }],
}, { collection: 'users' }, { timestamps: true })

const UserModel = mongoose.model('UserSchema', UserSchema)

module.exports = UserModel