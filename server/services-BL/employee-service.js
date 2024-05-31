const mongoose = require("mongoose");

const {
  getAllEmployees,
  getEmployee,
  getReletedEmployees,
  createEmployee,
  updateEmployee,
  addDepartmentToEmployees,
  deleteEmployee,
  addDepartmentToEmployee,
  removeDepartmentFromEmployees,
  removeDepartmentFromEmployee,
} = require("../repositories-DAL/employee-repository");
const { unassignEmployeeFromAllShifts } = require("./shift-service");

const creatNewEmployee = async (reqBody) => {
  const employee = await createEmployee(reqBody);
  return employee;
};

const getEmployees = async () => {
  const employees = await getAllEmployees();
  return employees;
};

const getEmployeesReleted = async (departementId) => {
  const employees = await getReletedEmployees(departementId);
  return employees;
};

const getEmployeeById = async (id) => {
 return await getEmployee(id);
  //  const [user]
  // return user;
};


const updateEmployeeById = async (id, reqBody) => {
  await updateEmployee(id, reqBody);
};

const updateManyById = async (departmentsId, reqBody) => {
  await addDepartmentToEmployees(id, reqBody);
};



const deleteEmployeeById = async (id) => {
  await deleteEmployee(id);
  return 'Employee deleted';
};

const assignDepartmentToEmployee = async (departmentId, employeeId) => {
  try {
    const departmentObjId = new mongoose.Types.ObjectId(departmentId);
    const DepartmentEmployee = await getEmployeeById(employeeId);
    
    // Compare the department IDs
    if (DepartmentEmployee.department._id.toString() === departmentObjId.toString()) 
        return;
    
    
    // Compare the department ObjectIDs
    if (DepartmentEmployee.department._id &&
        DepartmentEmployee.department._id.toString() !== departmentObjId.toString()) 
        await unassignEmployeeFromAllShifts(employeeId);
    
    
    // Assign the employee to the specified department
    const addedUserInDepartment = await addDepartmentToEmployee(departmentObjId, employeeId);
    return addedUserInDepartment;
  } catch (error) {
    console.error("Error assigning department to employee:", error);
  }
}

const unassignDepartmentFromEmployee = async (userId, {departmentId}) => {
  const removedUserFromDeparment = await removeDepartmentFromEmployee(departmentId, userId);
  return removedUserFromDeparment;
}

const unassignDepartmentFromEmployees = async (departmentId) => {
  const removedUserFromDeparment = await removeDepartmentFromEmployees(departmentId);
  return removedUserFromDeparment;
}


module.exports = {
  creatNewEmployee,
  getEmployees,
  getEmployeesReleted,
  getEmployeeById,
  updateEmployeeById,
  updateManyById,
  deleteEmployeeById,
  assignDepartmentToEmployee,
  unassignDepartmentFromEmployee,
  unassignDepartmentFromEmployees,
};

// const assignShiftToEmployee = async (userId, {shiftId}) =>{
//   const addedUserInShift = await addShiftsEmployee(shiftId, userId);
//   return addedUserInShift;
// }

// const unassignShiftFromEmployee = async (userId, {shiftId}) => {
//   const removedUserFromShift = await removeShiftsEmployee(shiftId, userId);
//   return removedUserFromShift;
// }