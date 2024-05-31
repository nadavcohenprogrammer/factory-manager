const express = require("express");
const router = express.Router();

const {
  isAuthenticated,
  isValidUpdate,
  isValidUpUserPermision,
  trackUserActions,
} = require("../validations/user-validations");
const {
  getUsers,
  getCompanyUsers,
  getUserByEmail,
  updateUserById,
  getUserById,
  deleteUserById,
  addUserToCompany,
  addDepartmentToUser,
  creatNewUser
} = require("../services-BL/user-service");
const { createJWTToken } = require("../auth");
const { default: mongoose } = require("mongoose");
const Company = require("../models/companies.model");
const serverErrorResponse = (res) => {
  res.status(500).json({
    error: "server error",
  });
};

router.get("/", trackUserActions, async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.get("/company-users/:companyId", trackUserActions, async (req, res) => {
  try {
    const { companyId } = req.params;
    const users = await getCompanyUsers(companyId);
    res.json(users);
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.get("/user", trackUserActions, async (req, res) => {
  try {
    const { email } = req.query;
    const user = await getUserByEmail(email);
    res.json(user);
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id).populate("company");
    res.json(user);
  } catch (error) {
    serverErrorResponse(res);
  }
});

// router.get("/companies/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const userIdObj = new mongoose.Types.ObjectId(userId);
//     console.log(userId);
//     const company = await User.findById(userId,{company}).populate(
//       "department"
//     );
//     console.log(company);
//     if (!company) {
//       return res.status(404).send("Company not found");
//     }
//     res.status(200).json(company);
//   } catch (error) {}
// });

router.post("/add-company/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const { userId } = req.body;

    const addedUser = await addUserToCompany(userId, companyId);

    res.status(201).json(addedUser);
  } catch (error) {
    serverErrorResponse(res);
  }
});


router.post("/add-user", async (req, res) => {
  try {
    const { companyId } = req.body;
    const user = await creatNewUser(req.body);
    const addedUser = await addUserToCompany(user._id, companyId);

    res.status(201).json(user);
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/add-department/:userId", async (req, res) => {
  try {
    const { permission:departmentsId } = req.body;
    console.log(departmentsId)
    const { userId } =  req.params;
    const result  = await addDepartmentToUser(userId, departmentsId);

    res.status(201).json(result);
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/edit-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await updateUserById(id, data);
    res
      .cookie("token", createJWTToken(data.email, data.firstName))
      .status(200)
      .json(updatedUser);
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    res.json(deletedUser);
  } catch (err) {
    serverErrorResponse(res);
  }
});

module.exports = router;
