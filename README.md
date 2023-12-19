


# Remote Engine Backend

Welcome to the Remote Engine Backend! This backend serves as the foundation for a professional developer onboarding platform. It includes authentication, user registration, and developer onboarding functionalities.



# Project Name

Remote Engine Backend

## Table of Contents

- [Usage](#usage)
  - [Sign In](#sign-in)
  - [Sign Up](#sign-up)
  - [Developer Onboarding](#developer-onboarding)
- [Project Structure](#project-structure)

## Usage

### Sign In

The `POST /developer/signin` endpoint handles user authentication.

Provide the user's email and password to receive a JWT token.

Invalid email or password returns appropriate error messages.



### Sign Up

The `POST /developer/signup` endpoint handles user registration.

Provide a unique email and a password.

If the email is already registered, an error message is returned.


### Developer Onboarding

The `POST /onboarding` endpoint handles developer onboarding.

Provide details such as full name, phone number, skills, professional experience, and educational experience.

Multiple entries for professional experience and education are supported.

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "1234567890",
  "email": "john.doe@example.com",
  "skills": ["JavaScript", "React"],
  "professionalExperience": [
    {
      "companyName": "ABC Inc.",
      "techStack": "Node.js",
      "selectedSkills": ["Node.js", "Express"],
      "timePeriod": "2020-2022"
    }
  ],
  "educationalExperience": [
    {
      "degreeName": "Bachelor's in Computer Science",
      "schoolName": "XYZ University",
      "timePeriod": "2016-2020"
    }
  ]
}' http://localhost:3000/onboarding
```

## Project Structure

- `index.js`: Main entry point for the application.
- `config/db.js`: Database connection configuration.
- `middlewares/authenticate.js`: Middleware for JWT authentication.
- `models/`: Folder containing Mongoose models (User, Skill, Developer).
- `routes/`: Folder containing Express routes (signin, signup, skills, developerOnboarding).
