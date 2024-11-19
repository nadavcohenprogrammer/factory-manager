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
  httpOnly: true, // Prevents JavaScript from accessing cookies
  secure: process.env.NODE_ENV === 'production', // Only send over HTTPS
  sameSite: 'None', // Allow cross-origin cookies
  domain: 'factory-manager-client.onrender.com', // Set this if needed
  path: '/' // Ensure this matches the path of your frontend
};

router.post("/register", isValidSignUp, async (req, res) => {
  try {
    const user = await creatNewUser(req.body);
    const token = createJWTToken(user.email, user.firstName);
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 3600000), // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      path: '/'
    };
    res.cookies("token", token, cookieOptions).status(200).json({
      user,
      success: true,
      message: "Registration successful!"
    });
  } catch (error) {
    console.error("Registration error:", error);
    serverErrorResponse(res);
  }
});

router.post("/login", isValidLogin, isValidUserCreditial, async (req, res) => {
  try {
    const { email } = req.body;
    const getUser = await getUserByEmail(email);
    const token = createJWTToken(email, getUser.firstName);
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 3600000), // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      path: '/'
    };
    res.cookie("token", token, cookieOptions).json(getUser);
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    res.json(true);
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.get("/profile", async (req, res) => {
  console.log("profile")
  const { token } = req.cookies;
  if (token) {
    const { email } = fetchToken(token);
    const user = await getUserByEmail(email);
    res.json(user);
  } else {
    res.json(null);
  }
});
module.exports = router;
