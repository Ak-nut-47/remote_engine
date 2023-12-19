# Remote Engine Frontend

Welcome to our Professional Developer Onboarding Platform! This platform allows developers to seamlessly sign in, sign up, and complete their onboarding process with ease.

## Features

### Sign In

Upon visiting the homepage, users are greeted with a user-friendly login form. Key features include:

- **User Validation**: The system validates user email existence in the database.
- **Error Handling via Modal**: If the user email is not registered, a Chakra modal gracefully informs the user of "User Not Found."
- **Password Validation**: If the user is found but the password doesn't match, a clear message notifies the user of "Incorrect Password."

  ![Screenshot 2023-12-19 154603](https://github.com/Ak-nut-47/remote_engine/assets/104593018/c9b20792-e100-4baa-a3b2-d953fd95383b)


### Sign Up

For new users, a signup link is provided on the signin page. Features include:

- **User Registration**: Users are directed to the signup page to provide necessary details.
- **Redirect to Sign In**: After successful signup, users are redirected to the signin page to input their details correctly.

  ![Screenshot 2023-12-19 154634](https://github.com/Ak-nut-47/remote_engine/assets/104593018/6ec9c080-bfee-4d86-ac8b-84a22b066e64)


### Developer Onboarding

Upon receiving a token from the backend, users are redirected to the Developer Onboarding page. Features include:

- **Input Fields**: Users can input their full name, phone number, and details of professional experience and education.
- **Add Multiple Experiences**: Users can add multiple entries for professional experience and education.
- **Remove Multiple Experiences**: Users can remove multiple entries for professional experience and education.
-  **Skill Used**: Skills Used inside the professional experience will be fetched from backend and user can select multiple skills

  ![Screenshot 2023-12-19 154620](https://github.com/Ak-nut-47/remote_engine/assets/104593018/bf664462-3d6b-4270-906d-d2ecd4e3ccd2)

![Screenshot 2023-12-19 154911](https://github.com/Ak-nut-47/remote_engine/assets/104593018/198e35e5-a054-4616-8b47-f5891ea369f8)




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
