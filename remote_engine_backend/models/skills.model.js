const mongoose = require('mongoose');


const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

});


const SkillModel = mongoose.model('Skill', skillSchema);

module.exports = SkillModel;
