const express = require("express");
const router = express.Router();
const { createJWTToken, fetchToken } = require("../auth/index");
const {
  isValidSignUp,
  isValidUserCreditial,
  isValidLogin,
} = require("../validations/user-validations");
const {
  creatNewUser,
  getUserByEmail,
} = require("../services-BL/user-service");

const serverErrorResponse = (res) => {
  res.status(500).json({
    error: "Server error",
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'None',
  path: '/',
  domain: 'factory-manager-client.onrender.com',
};

router.post("/register", isValidSignUp, async (req, res) => {
  try {
    const user = await creatNewUser(req.body);
    const token = createJWTToken(user.email, user.firstName);

    res.cookie("token", token, { ...cookieOptions, expires: new Date(Date.now() + 24 * 3600000) })
      .status(200)
      .json({
        user,
        success: true,
        message: "Registration successful!",
      });
  } catch (error) {
    console.error("Registration error:", error);
    serverErrorResponse(res);
  }
});

router.post("/login", isValidLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the database for the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password is valid
    const isPasswordValid = await isValidUserCreditial(email, password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token after validating the user
    const token = createJWTToken(user.email, user.firstName);

    // Set the cookie with the token
    res.cookie("token", token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 24 * 3600000), // 24 hours
    });

    // Send back user data
    res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    serverErrorResponse(res);
  }
});


router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const { email } = fetchToken(token);
      const user = await getUserByEmail(email);
      res.status(200).json(user);
    } else {
      res.status(401).json(null);
    }
  } catch (error) {
    console.error("Profile error:", error);
    serverErrorResponse(res);
  }
});

module.exports = router;
