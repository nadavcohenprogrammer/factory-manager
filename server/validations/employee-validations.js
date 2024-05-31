const { getEmployeeById } = require("../services-BL/employee-service");
const { getShiftById } = require("../services-BL/shift-service");
const { isValidFields, isValidUpdateFields } = require("./utils");




const isNotAssignToDepart = async (req, res, next) => {
  const { employeeId } = req.body;
  const employee = await getEmployeeById(employeeId);
  const shift = await getShiftById(req.params.id);
  if (employee.department._id) {
    console.log({departmentId:employee.department._id,shiftId:shift.department._id})

    if (employee.department.id !== shift.department._id) {
        return res.status(400).json({
          message: `${employee.firstName} - ${employee.lastName} already exists in another department`,
        });
    }
  }
  return next();
};
module.exports = { isNotAssignToDepart };
