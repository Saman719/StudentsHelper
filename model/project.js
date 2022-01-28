const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
    courseName: { type: String },
    fieldOfStudy: { type: String },
    description: { type: String },
    price: { type: Number },
    status: { type: String, default: 'active' },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
    // applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' }],
    // chosenApplicant: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
}, { collection: 'projects' }, { timestamps: true })

const ProjectModel = mongoose.model('ProjectSchema', ProjectSchema)

module.exports = ProjectModel