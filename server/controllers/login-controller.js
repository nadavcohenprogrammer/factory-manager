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
    error: "server error",
  });
};

router.post("/register",isValidSignUp, async (req, res) => {
  try {
    const user = await creatNewUser(req.body);
    const option = {
      expiresIn: "24h"
    }
    res.cookie("token", createJWTToken(user.email, user.firstName),option).status(200).json({
      user,
      success: true,
      message: "Registration successful!"
    });
  } catch (error) {
    console.error("Registration error:", error);
    serverErrorResponse(res)
  }
});

router.post("/login",isValidLogin,isValidUserCreditial,async (req, res) => {
  try {
    const { email } = req.body;
    const getUser = await getUserByEmail(email);
    const token = createJWTToken(email, getUser.firstName);
    // getUser.lastLogin = Date.now();
    res.cookie("token", token).json(getUser);
  } catch (error) {
     serverErrorResponse(res);
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token"); // Use clearCookie to remove the cookie
    res.json(true);
  } catch (error) {
    serverErrorResponse(res);
  }
});


router.get("/profile", async (req, res) => {
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
