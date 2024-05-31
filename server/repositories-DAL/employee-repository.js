const mongoose = require("mongoose");

const Employee = require("../models/employee.model");
const {
  unassignEmployeeFromAllShifts,
} = require("../services-BL/shift-service");

const createEmployee = async ({ firstName, lastName, departmentId }) => {
  const deprtObjId = new mongoose.Types.ObjectId(departmentId);
  const newEmployee = new Employee({
    firstName,
    lastName,
    department: deprtObjId,
  });
  await newEmployee.save();
  return newEmployee;
};

const getAllEmployees = async () => {
  const employees = await Employee.find().populate("department");
  return employees;
};

const getReletedEmployees = async (departmentId) => {
    try {
      const employees = await Employee.find({ department: departmentId })
        .populate({
          path: "department",
          populate: {
            path: "manager",
          },
        });
      return employees;
    } catch (error) {
      console.error("Error fetching related employees:", error);
      throw error; // or handle the error accordingly
    }
  };
  

const getEmployee = async (id) => {
  const employee = await Employee.findById(id).populate("department");
  return employee;
};

const updateEmployee = async (id, reqBody) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(id, reqBody, {
    new: true,
  });
  return updatedEmployee;
};

const deleteEmployee = async (id) => {
  await unassignEmployeeFromAllShifts(id);
  await Employee.findByIdAndDelete(id);
};

// Checks if the employee is already registered for this department
// If not, he writes it down
// If the employee is registered to another department, he updates his department and deletes him from the shifts of the previous department

const addDepartmentToEmployee = async (departmentObjId, employeeId) => {
  try {
    const employee = await Employee.findByIdAndUpdate(employeeId, {
      department: departmentObjId,
    });
    return employee;
  } catch (error) {
    console.error("Department not found", error);
  }
};

const addDepartmentToEmployees = async (departmentId, employeesId) => {
  const departmentObjId = new mongoose.Types.ObjectId(departmentId);
  const updatedEmployees = [];

  for (const employeeId of employeesId) {
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { department: departmentObjId },
      { new: true } // To return the updated document
    );
    updatedEmployees.push(employee);
  }

  return updatedEmployees;
};

const removeDepartmentFromEmployee = async (departmentId, employeeId) => {
  const departmentObjId = new mongoose.Types.ObjectId(departmentId);
  const employee = await Employee.findByIdAndUpdate(
    employeeId,
    {
      $pull: { department: departmentObjId },
    },
    { new: true }
  );
  return employee;
};

const removeDepartmentFromEmployees = async (departmentId) => {
  try {
    const employeesConnected = await Employee.find({
      department: departmentId,
    });
    if (employeesConnected.length > 0) {
      await Employee.updateMany(
        { department: departmentId },
        { $unset: { department: 1 } }
      );
      return "Department removed from employees";
    } else {
      return "No employee connected to the department";
    }
  } catch (error) {
    throw error; // Throw the error directly
  }
};

module.exports = {
  getAllEmployees,
  getReletedEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  addDepartmentToEmployees,
  deleteEmployee,
  addDepartmentToEmployee,
  removeDepartmentFromEmployees,
  removeDepartmentFromEmployee,
};

// const addShiftsEmployee = async (shiftId, employeeId) => {
//   const shiftIdObjId =  new mongoose.Types.ObjectId(shiftId);
//   const employee = await Employee.findByIdAndUpdate(employeeId, {
//     $push: { shifts: shiftIdObjId }
//   });
//   return employee;
// };

// const removeShiftsEmployee = async (shiftId, employeeId) => {
//   const shiftIdObjId =  new mongoose.Types.ObjectId(shiftId);
//   const employee = await Employee.findByIdAndUpdate(employeeId,{
//       $pull: { shifts: shiftIdObjId },},{ new: true });
//   return employee;
// };

// const removeShiftFromEmployees = async  (id) => {
// try {
//   const allEmployees = await getAllEmployees();
//   for (const employee of allEmployees) {
//     for(const shifts of employee){
//       if (shifts) {

//       }
//     }

//   }
// } catch (error) {
//   throw error;
// }

// }
