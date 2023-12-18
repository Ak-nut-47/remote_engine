const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const signUpRouter = express.Router();

signUpRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;


        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new UserModel({
            email,
            password: hashedPassword,
        });


        const savedUser = await newUser.save();


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
