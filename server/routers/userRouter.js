// Import required modules and libraries
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require('../utils/config');
const { sendResetPasswordEmail, sendVerificationEmail } = require('../mailer');
const { validateFields, errorHandler } = require('../middleware/middleware');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

// Endpoint to register a new user
userRouter.post("/", 
  validateFields(['email', 'password', 'firstName', 'lastName']), 
  asyncErrorHandler(async (req, res, next) => {
    const body = req.body;
    // Check for existing user to prevent duplicate registrations
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).json({ errorMessage: "User already exists" });
    }

    // Add unique properties to the user object based on the role
    User.addProperties(body.role);

    // Construct new user object
    let newUserObject = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      role: body.role
    };

    // Create and save the new user
    const newUser = new User(newUserObject);
    await newUser.setPassword(body.password);
    await newUser.save();

    // Send verification email unless the user is a supervisor
    if(newUser.role !== 'supervisor') {
      const verificationToken = newUser.generateEmailVerificationToken();
      const verificationLink = `http://localhost:5000/verify-email/${verificationToken}`;
      sendVerificationEmail(newUser, verificationLink);
    }
    res.status(201).json({ userId: newUser._id, message: "User created. Verification email sent." });
}));

// Endpoint for user's forgotten password request
userRouter.post("/forgot-password", 
  validateFields(['email']), 
  asyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;
    // Check if the user exists
    const existUser = await User.findOne({ email: email });

    // Send a password reset link if user exists
    if (!existUser) {
      return res.json({ message: "Password reset link sent to email" });
    }

    sendResetPasswordEmail(existUser);
    res.status(200).json({ message: "Password reset link sent to email" });
}));

// Endpoint to validate a user's token
userRouter.post("/validate-token", 
  validateFields(['token']), 
  asyncErrorHandler(async (req, res, next) => {
    // Verify the provided token
    jwt.verify(req.body.token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ errorMessage: "Invalid token" });
      }
      res.status(200).json({ message: "Token is valid" });
    });
}));

// reset-password
userRouter.post("/reset-password",
  validateFields(['token', 'newPassword']),  
  asyncErrorHandler(async(req, res) => {

// Retrieve token and new password from request body
    const { token, newPassword } = req.body;

// Validation to ensure token and new password are provided
    if (!token || !newPassword) {
      return res.status(400).json({ errorMessage: "Token and password are required" });
    }

// Verify the token and proceed with password reset
    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ errorMessage: "Invalid token" });
      }

      // Locate user based on decoded token ID
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ errorMessage: "User does not exist" });
      }

      // Update the user's password
      await user.setPassword(newPassword);
      await user.save();
      res.status(200).json({ message: "Password reset successful" });
    });
  }))

// login
userRouter.post("/login", 
  validateFields(['email', 'password']),  
  asyncErrorHandler(async (req, res, next) => {

    const { email, password } = req.body;

    // Attempt to find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }

// Validate the password
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ errorMessage: "Incorrect password" });
    }

// Generate and send a JWT token
    const token = await user.generateJWT();
    res.cookie("token", token, { httpOnly: true }).send("Logged in");
  }));

// Endpoint to check if the user is currently logged in
userRouter.get("/loggedIn", 
  asyncErrorHandler(async (req, res) => {
    // Retrieve token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.json({ loggedIn: false });
    }

    // Verify the token and respond with user's logged-in status
    const validateUser = jwt.verify(token, config.JWT_SECRET);
    res.json({ loggedIn: true, user: validateUser });
}));

// Endpoint to logout the user
userRouter.get("/logout", 
  asyncErrorHandler((req, res) => {
    // Clear the token cookie to log the user out
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).send("Logged out");
}));

// verify-email
userRouter.get('/verify-email/:token', 
  asyncErrorHandler(async (req, res, next) => {  
    const { token } = req.params;

    // Verify the email token and activate the user's email
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      console.error("User not found with ID:", decoded.id);
      return res.status(400).json({ errorMessage: 'User not found' });
    }

    user.emailVerified = true;
    await user.save();

    // Redirect user to the reset-password page
    return res.redirect(`http://localhost:5000/reset-password/${token}`);
}));

userRouter.use(errorHandler);
module.exports = userRouter