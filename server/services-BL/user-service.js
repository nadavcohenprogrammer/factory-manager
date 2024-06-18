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
  const user = await createUser(reqBody);
  return user;
};

const getUsers = async () => {
  
  return await getAllUsers();
}

const getCompanyUsers = async (companyId) => {
  return await getAllUsersOfCompany(companyId);
};

const getUserByEmail = async (email) => {
  const user = await getUserWithEmail(email);
  if (!user) throw new Error("User not found");
  return user;
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
    console.log({ userCompany: user.company, company: companyObjId });
    const updatedUser = await updateUserById(user, { company: companyObjId });
    console.log(updatedUser);
    return updatedUser;
  }
};

const addDepartmentToUser = async (userId, departmentId) => {
 
  try {
    
    const user = await getUserById(userId);
     let update = {};
    const departmentsObjId = [];
    // update["departments"] = departmentsObjId;
    // for (const id of departmentId)
    // departmentsObjId.push(new mongoose.Types.ObjectId(id));
    // update[key] = usersObjId;
    console.log(user);
    departmentId.map((depart) => {
      const departmentObjId = new mongoose.Types.ObjectId(depart.name);
      departmentsObjId.push(
        departmentObjId,
      );
      update[index] = {}
    });
    return await updateUserById(user._id, 
      { $set: update },
      { new: true }
    );
  } catch (error) {
    console.error(error);
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
