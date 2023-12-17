const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model"); // Adjust the path based on your project structure

const signUpRouter = express.Router();

signUpRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hashing the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new user with the hashed password
        const newUser = new UserModel({
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with the saved user information
        res.status(201).json({
            user: {
                id: savedUser._id,
                email: savedUser.email,
            },
        });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = signUpRouter;
