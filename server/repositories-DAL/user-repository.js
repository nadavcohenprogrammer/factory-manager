const User = require("../models/users.model");

const { createPassword, createRandomSalt } = require("../auth/index");
const { default: mongoose } = require("mongoose");
const { populate } = require("dotenv");

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  companyId,
}) => {
  const salt = createRandomSalt();
  const companyObjId = new mongoose.Types.ObjectId(companyId);
  const newUser = new User({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    password: createPassword(password.trim(), salt),
    company: companyObjId,
    salt,
  });
  await newUser.save();
  return newUser;
};

const getAllUsers = async () => await User.find().populate({
  path: "company",
  populate: {
    path: "department",
    populate: {
      path: "manager",
    },
  },
})
// .populate({path:"departments",populate:{path:"permission"}});

const getAllUsersOfCompany = async (companyId) => {
  console.log(companyId)
  const companyObjId = new mongoose.Types.ObjectId(companyId);
  const users = await User.find({ company: companyId }).populate({
    path: "company",
    populate: {
      path: "department",
      populate: {
        path: "manager",
      },
    },
  });
  console.log(users)
  return users;
}

const getUserWithEmail = async (email) => {
  return await User.findOne({ email }).populate({
    path: "company",
    populate: {
      path: "department",
      populate: {
        path: "manager",
      },
      populate: {
        path: "name",
      },
    },
  });
};

const getUserWithId = async (userId) => await User.findById(userId);

const updateUser = async (user, reqBody) =>
  await User.findByIdAndUpdate(user._id, { $push:reqBody}, { new: true });

const deleteUser = async (id) => await User.findByIdAndDelete(id);

module.exports = {
  getAllUsers,
  getAllUsersOfCompany,
  getUserWithId,
  getUserWithEmail,
  getUserWithEmail,
  createUser,
  updateUser,
  deleteUser,
};
