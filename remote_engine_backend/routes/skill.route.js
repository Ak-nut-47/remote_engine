const express = require('express');
const SkillModel = require('../models/skills.model');

const skillRouter = express.Router();

// Endpoint to add a new skill
skillRouter.post('/add', async (req, res) => {
    try {
        // Assuming the request body contains the new skill details
        const { name } = req.body;

        // Check if the skill already exists
        const existingSkill = await SkillModel.findOne({ name });
        if (existingSkill) {
            return res.status(400).json({ message: 'Skill already exists' });
        }

        // Create and save the new skill
        const newSkill = new SkillModel({ name });
        const savedSkill = await newSkill.save();

        res.status(201).json(savedSkill);
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Endpoint to fetch all skills
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
