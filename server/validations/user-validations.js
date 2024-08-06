const { isValidToken } = require("../auth/index");
const { isValidFields, isValidUpdateFields } = require("./utils");
const { createJWTToken, createPassword } = require("../auth/index");
const { getUserByEmail, updateUserById } = require("../services-BL/user-service");
const { updateEmployeeById } = require("../services-BL/employee-service");
// const {cookie} = require('cookie');

const isValidSignUp = async (req, res, next) => {
  const fields = ["firstName", "lastName", "email", "password","company"];
  if (!isValidFields(req.body, fields)) {
    return res.status(400).json({
      error: "Invalid  signup fields",
    });
  }
  const { email } = req.body;
  const userExists = await getUserByEmail(email.trim());
  if (userExists) {
    return res.status(400).json({
      error: "user already exists",
    });
  }
  return next();
};

const trackUserActions = async (req, res, next) => {
  const { email } = req.user;
  const getUser = await getUserByEmail(email);
  if (getUser.currentActions >= getUser.numOfActions) {
    return res.status(429).json({
      error: `Too many requests. You have only ${getUser.numOfActions} requests per day Please try again tomorrow.`,
    });
  }
  //  console.log(getUser.id)
  req.session.actionCount =  (req.session.actionCount || 0) + 1;
  const currentActions = req.session.actionCount;
  // console.log({currentActions})
  await updateUserById(getUser.id,  {currentActions} );
  return next();
};

const isValidLogin = (req, res, next) => {
  const fields = ["email", "password"];
  if (!isValidFields(req.body, fields)) {
    return res.status(400).json({
      error: "invalid signup fields",
    });
  }
  return next();
};

const isValidUserCreditial = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(400).json({
      error: "user not found",
    });
  }
  if (user.password !== createPassword(password, user.salt)) {
    return res.status(401).json({
      error: "invalid password",
    });
  }
  return next();
};

const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  const tokenValid = isValidToken(token);
  if (!tokenValid) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
  req.user = tokenValid; 
  next();
};

const isValidUpUserPermision = async (req, res, next) => {
  const { email } = req.user;
  const user = await getUserByEmail(email);
  if (user.role === "user") {
    return res.status(400).json({
      error: "User does not have permission for this action",
    });
  }
  return next();
};

const isValidUpAdminPermision = async (req, res, next) => {
  const { email } = req.user;
  const user = await getUserByEmail(email);
  if (user.role !== "superadmin") {
    return res.status(400).json({
      error: "User does not have permission for this action",
    });
  }
  return next();
};

const isValidUpdate = (req, res, next) => {
  const fields = ["firstName", "lastName", "email"];
  if (!isValidUpdateFields(req.body, fields)) {
    return res.status(400).json({
      error: "invalid update fields",
    });
  }
  return next();
};

const isValidPasswordUpdate = (req, res, next) => {
  const fields = ["oldPassword", "newPassword"];
  if (!isValidFields(req.body, fields)) {
    return res.status(400).json({
      error: "invalid password update fields",
    });
  }
  return next();
};

const isValidPasswordReset = (req, res, next) => {
  const fields = ["email", "newPassword"];
  if (!isValidFields(req.body, fields)) {
    return res.status(400).json({
      error: "invalid password reset fields",
    });
  }
  return next();
};

const isValidOldPassword = async (req, res, next) => {
  const { email } = req.user;
  const user = await getUserByEmail(email);
  const { oldPassword } = req.body;
  if (user.password !== oldPassword) {
    return res.status(400).json({
      error: "invalid old password",
    });
  }
  return next();
};

module.exports = {
  isValidSignUp,
  trackUserActions,
  isValidLogin,
  isValidUserCreditial,
  isAuthenticated,
  isValidUpUserPermision,
  isValidUpAdminPermision,
  isValidUpdate,
  isValidPasswordUpdate,
  isValidOldPassword,
  isValidPasswordReset,
};

// const isUserExists = async (req, res, next) => {
//   const { email } = req.body;
//   const userExists = await getUser(email);
//   if (!userExists) {
//     return res.status(400).json({
//       error: "user not exists"
//     });
//   }
//   return next();
// };
