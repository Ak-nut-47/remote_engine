const express = require('express');
const SkillModel = require('../models/skills.model');

const skillRouter = express.Router();


skillRouter.post('/add', async (req, res) => {
    try {

        const { name } = req.body;


        const existingSkill = await SkillModel.findOne({ name });
        if (existingSkill) {
            return res.status(400).json({ message: 'Skill already exists' });
        }


        const newSkill = new SkillModel({ name });
        const savedSkill = await newSkill.save();

        res.status(201).json(savedSkill);
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


skillRouter.get('/all', async (req, res) => {
    try {
        const allSkills = await SkillModel.find();
        res.status(200).json(allSkills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = skillRouter;
