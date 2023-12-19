const express = require('express');
const DeveloperModel = require('../models/developer.model');
const SkillModel = require('../models/skills.model');

const developerOnboardingRouter = express.Router();

developerOnboardingRouter.post('/', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            skills,
            professionalExperience,
            educationalExperience,
        } = req.body;



        const professionalExpArray = Array.isArray(professionalExperience) ? professionalExperience : [];

        // Find existing skills and get their IDs
        const skillIds = await Promise.all(Array.isArray(skills) ? skills.map(async skillName => {
            const existingSkill = await SkillModel.findOne({ name: skillName });
            return existingSkill ? existingSkill._id : null; // Return null for non-existing skills
        }) : []);


        // Update professional experience with skill references
        const updatedProfessionalExperience = professionalExpArray?.map(exp => ({
            ...exp,
            selectedSkills: skillIds.filter(id => id !== null), // Filter out null values (non-existing skills)
        }));

        const newDeveloper = new DeveloperModel({
            firstName,
            lastName,
            phoneNumber,
            email,
            skills: skillIds.filter(id => id !== null), // Filter out null values (non-existing skills)
            professionalExperience: updatedProfessionalExperience,
            educationalExperience,
        });

        const savedDeveloper = await newDeveloper.save();

        res.status(201).json(savedDeveloper);
    } catch (error) {
        console.error('Error submitting developer onboarding details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = developerOnboardingRouter;
