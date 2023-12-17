const express = require("express");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const UserModel = require("../models/user.model"); // Adjust the path based on your project structure

const signInRouter = express.Router();

signInRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        // Generate a token
        const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expiration time
        });

        // Respond with the token and user information
        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = signInRouter;
