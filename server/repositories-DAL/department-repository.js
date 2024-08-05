const mongoose = require("mongoose");

const Department = require("../models/department.model");
const { updateEmployeeById, unassignDepartmentFromEmployees } = require("../services-BL/employee-service");
const { deleteShiftRelatedToDepartment } = require("../services-BL/shift-service");

const getAllDepartments = async () =>
  await Department.find().populate("manager");

// const getCompanyDepartments = async (companyId) =>{
//   const dep = await Department.find({company:companyId}).populate("manager");
//   console.log(dep)
//   return dep;

// }
const getDepartment = async (id) =>
  await Department.findById(id).populate("manager");

const createDepartment = async ({ departmentName, managerId }) => {
  try {
    if (managerId) {
      const managerObjId = new mongoose.Types.ObjectId(managerId);
      const newDepartment = new Department({
        name: departmentName,
        manager: managerObjId,
      });
      await newDepartment.save();
      await updateEmployeeById(managerId, { isWorkManager: true });
      return newDepartment;
    } else {
      const newDepartment = new Department({
        name: departmentName,
      });
      await newDepartment.save();
      return newDepartment;
    }
  } catch (error) {
    throw console.error("Error adding department : ", error);
  }
};

const updateDepartment = async (departmentId,{ departmentName, managerId }) => {
  if (managerId) {
    const managerObjId = new mongoose.Types.ObjectId(managerId);
    await Department.findByIdAndUpdate(departmentId, 
    {  name: departmentName,manager: managerObjId},
      { new: true }
    )}
    else {
    await Department.findByIdAndUpdate(departmentId,{ name: departmentName },{ new: true })
  };
};

const deleteDepartment = async (departmentId) => {
  const deletedDepartment = await Department.findByIdAndDelete(departmentId);
  await unassignDepartmentFromEmployees(departmentId);
  await deleteShiftRelatedToDepartment(departmentId);
  return deletedDepartment;
};

module.exports = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
};
