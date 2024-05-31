const mongoose = require("mongoose");

const Shift = require("../models/shift.modole");
const {
  assignDepartmentToEmployee,
} = require("../services-BL/employee-service");
const { addDepartmentToEmployee } = require("./employee-repository");

const getAllShifts = async () => {
  try {
    const shifts = await Shift.find()
      .populate("employees")
      .populate("department");
    return shifts;
  } catch (error) {
    throw error;
  }
};

const getShiftsByDepartment = async (departmentId) => {
  try {
    return await Shift.find({
      department: departmentId,
    })
      .populate("employees")
      .populate("department");
  } catch (error) {
    throw error;
  }
};

const getShift = async (id) => {
  try {
    const shift = await Shift.findById(id).populate({
      path: "employees",
      populate: {
        path: "department",
      },
    });

    return shift;
  } catch (error) {
    throw error;
  }
};

const createShift = async (
  selectDepartmen,
  { date, startingHour, endingHour }
) => {
  try {
    const departObjId = new mongoose.Types.ObjectId(selectDepartmen);
    const newShift = new Shift({
      date,
      startingHour,
      endingHour,
      department: departObjId,
    });
    await newShift.save();
  } catch (error) {
    console.error("Error creating shift1:", error);
    throw error;
  }
};

const updateShift = async (shiftId, newData) => {
  try {
    const updatedShift = await Shift.findByIdAndUpdate(shiftId, newData, {
      new: true,
    });
    return updatedShift;
  } catch (error) {
    throw error;
  }
};

const removeEmployeeFromShift = async (shiftId, employeeId) => {
  const employeeObjId = new mongoose.Types.ObjectId(employeeId);
  const shift = await Shift.findByIdAndUpdate(
    shiftId,
    { $pull: { employees: employeeObjId } },
    { new: true }
  );
  return shift;
};

const removeEmployeeFromAllShifts = async (employeeId) => {
  const employeeObjId = new mongoose.Types.ObjectId(employeeId);
  const removedEmployees = await Shift.updateMany(
    {},
    { $pull: { employees: employeeObjId } }
  );
  if (!removedEmployees.nModified) {
    return "employee not found in any shifts";
  }
  return removedEmployees;
};

const addEmployeeToShift = async (shiftId, employeeId) => {
  try {
    const employeeObjId = new mongoose.Types.ObjectId(employeeId);
    return await Shift.findByIdAndUpdate(shiftId, {
      $push: { employees: employeeObjId },
    });
  } catch (error) {
    console.error("Error adding employee to shift:", error);
    throw error;
  }
};

const deleteShift = async (shiftId) => {
  try {
    const deletedShift = await Shift.findByIdAndDelete(shiftId);
    return deletedShift;
  } catch (error) {
    throw error;
  }
};

const deleteShifts = async (departmentId) => {
  try {
    const shiftsConnected = await Shift.find({ department: departmentId });

    if (shiftsConnected.length > 0) {
      await Shift.deleteMany({ department: departmentId });
      return "All shifts connected to department deleted";
    } else {
      return "No shifts connected to department";
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllShifts,
  getShiftsByDepartment,
  getShift,
  createShift,
  updateShift,
  removeEmployeeFromShift,
  removeEmployeeFromAllShifts,
  addEmployeeToShift,
  deleteShift,
  deleteShifts,
};

// const addDepartmentToShift = async (shiftId, departmentId) => {
//   try {
//     const departObjId = new mongoose.Types.ObjectId(departmentId);
//     const updatedShift = await Shift.findByIdAndUpdate(shiftId, {
//       department: departObjId,
//     });
//     return updatedShift;
//   } catch (error) {
//     throw error;
//   }
// };
