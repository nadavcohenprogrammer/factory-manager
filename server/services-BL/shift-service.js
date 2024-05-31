const mongoose = require("mongoose");

const {
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
} = require("../repositories-DAL/shift-repository");

const creatNewShift = async (selectDepartment,newShift) => {
  try {
    const user = await createShift(selectDepartment,newShift);
    return user;
  } catch (error) {
    throw error;
  }
};

const getShifts = async () => {
  const shifts = await getAllShifts();
  return shifts;
};

const getShiftsRelatadeToDepartment = async (departmentId) => {
  const shifts = await getShiftsByDepartment(departmentId);
  return shifts;
};

const getShiftById = async (shiftId) => {
  const shift = await getShift(shiftId);
  return shift;
};

const updateShiftById = async (shiftId, newData) => {
  await updateShift(shiftId, newData);
};

const deleteShiftById = async (shiftId) => {
  const result = await deleteShift(shiftId);
  if (!result) {
    throw new Error("Error deleting shift");
  }
  return "Successfully deleted Shift";
};

const deleteShiftRelatedToDepartment = async (shiftId) => {
  const result = await deleteShifts(shiftId);
  if (!result) {
    throw new Error("Error deleting shift");
  }
  return "Successfully deleted Shift";
};

const assignEmployeeToShift = async (shiftId, employeeId) =>
  await addEmployeeToShift(shiftId, employeeId);


const unassignEmployeeFromShift = async (shiftId, employeeId ) => {
  await removeEmployeeFromShift(shiftId, employeeId);
};

const unassignEmployeeFromAllShifts = async (employeeId ) => {
  await removeEmployeeFromAllShifts(employeeId);
};

module.exports = {
  creatNewShift,
  getShiftsRelatadeToDepartment,
  getShifts,
  getShiftById,
  updateShiftById,
  assignEmployeeToShift,
  unassignEmployeeFromShift,
  deleteShiftById,
  deleteShiftRelatedToDepartment,
  unassignEmployeeFromAllShifts,
};
