const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connection = require('./config/db');
const signInRouter = require('./routes/signin.route');
const signUpRouter = require('./routes/signup.route');
const cors = require('cors');
const skillRouter = require('./routes/skill.route');
const developerOnboardingRouter = require('./routes/developerOnboarding.route');


const app = express();

dotenv.config();


app.use(express.json());
app.use(cors());


app.use('/skills', skillRouter);
app.use('/onboarding', developerOnboardingRouter);


app.use('/developer/signin', signInRouter);
app.use('/developer/signup', signUpRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connection;
    console.log(`Server is running on http://localhost:${PORT} and is connected to the Database`);
});
