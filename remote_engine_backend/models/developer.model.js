const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
    firstName: {
        type: [String],
        required: true,
    },
    lastName: {
        type: [String],
        required: true,
    },
    phoneNumber: {
        type: [String],
        required: true,
    },
    email: {
        type: String,

        unique: true,
    },
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skills',
    }],
    professionalExperience: [{
        companyName: String,
        techStack: String,
        selectedSkills: [String],
        timePeriod: String,
    }],
    educationalExperience: [{
        degreeName: String,
        schoolName: String,
        timePeriod: String,
    }],
});

const DeveloperModel = mongoose.model('Developer', developerSchema);

module.exports = DeveloperModel;
