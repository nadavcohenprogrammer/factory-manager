const mongoose = require("mongoose");
const {
  getAllUsers,
  getAllUsersOfCompany,
  getUserWithId,
  getUserWithEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../repositories-DAL/user-repository");

const creatNewUser = async (reqBody) => {
  try{
    const user = await createUser(reqBody);
    return user;
  }catch{
    return {error: "Error creating user"};
  }
};

const getUsers = async () => {
  
  return await getAllUsers();
}

const getCompanyUsers = async (companyId) => {
  return await getAllUsersOfCompany(companyId);
};

const getUserByEmail = async (email) => {
  try {
    const user = await getUserWithEmail(email);
    return user;
  } catch (error) {
    
    throw new Error("User not found");
  }
};

const getUserById = async (userId) => {
  const user = await getUserWithId(userId);
  if (!user) throw new Error("User not found");
  return user;
};

const updateUserById = async (user, reqBody) => await updateUser(user, reqBody);

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  await deleteUser(user);
};

const addUserToCompany = async (userId, companyId) => {
  const user = await getUserById(userId);
  const companyObjId = new mongoose.Types.ObjectId(companyId);
  if (user.company.includes(companyObjId)) {
    return user;
  } else {
    const updatedUser = await updateUserById(user, { company: companyObjId });
    return updatedUser;
  }
};

const addDepartmentToUser = async (userId, departmentIds) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Construct the departments array
    const departments = departmentIds.map(department => ({
      department: new mongoose.Types.ObjectId(department.name),
      permission: department.value
    }));
    const update = { departments };
    const updatedUser = await updateUserById(user._id, update, { new: true });
    return updatedUser;
  } catch (error) {
    console.error('Error in addDepartmentToUser:', error);
    throw error; // It's a good practice to rethrow the error after logging it
  }
};

// try {
//   const updatedCompany = await Company.findByIdAndUpdate(
//     req.params.id,
//     { $set: update },
//     { new: true }
//   );
//   res.status(200).json(updatedCompany);
// } catch (err) {
//   res.status(500).json({ message: err.message });
// }

// If the department already exists in the user's departments array, return the user object with no changes
// if (user.departments.includes(departmentObjId)) {
//   return user;
// } else {
//   const updatedUser = await updateUserById(user, {
//     departments: [...user.departments, departmentObjId],
//   });
//   return updatedUser;
// }
//   return user;
// };

module.exports = {
  creatNewUser,
  getUsers,
  getCompanyUsers,
  getUserByEmail,
  updateUserById,
  getUserById,
  deleteUserById,
  addUserToCompany,
  addDepartmentToUser,
  // signUp,
  // getUserByEmail,
  // passwordUpdate
};
