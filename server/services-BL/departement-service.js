const mongoose = require("mongoose");

const {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
} = require("../repositories-DAL/department-repository");

const getDepartments = async () => {
  try {
    const departments = await getAllDepartments();
    return departments;
  } catch (error) {
    throw error;
  }
};

// const getDepartmentsById = async (companyId) => {
//   const departments = await getCompanyDepartments(companyId);
//   if (!departments) {
//     throw new Error("Departments not found");
//   }
//   return departments;
// };

const getDepartmentById = async (id) => {
  const department = await getDepartment(id);
  if (!department) {
    throw new Error("Department not found");
  }
  return department;
};

const createNewDepartment = async (reqBody) => 
 await createDepartment(reqBody);

const updateDepartmentById = async (id, reqBody) => {
  const updatedDept = await updateDepartment(id, reqBody);
  return updatedDept;
};
const deleteDepartmentById = async (id) => {
  await deleteDepartment(id);
  return "Successfully deleted the department";
};




module.exports = {
  getDepartments,
  createNewDepartment,
  updateDepartmentById,
  deleteDepartmentById,
  getDepartmentById,
};
