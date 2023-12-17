const express = require('express');
const DeveloperModel = require("../models/developer.model");

const developerOnboardingRouter = express.Router();

// Endpoint to submit developer onboarding details
developerOnboardingRouter.post('/', async (req, res) => {
    try {
        // Assuming the request body contains the onboarding details
        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            skills,
            professionalExperience,
            educationalExperience,
        } = req.body;
        console.log(req.body)
        // Create and save the new developer
        const newDeveloper = new DeveloperModel({
            firstName,
            lastName,
            phoneNumber,
            email,
            skills,
            professionalExperience,
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
