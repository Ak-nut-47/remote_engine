const express = require("express");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const signInRouter = express.Router();

signInRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect Password" });
        }


        const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });


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
